<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import type { Row } from '@tanstack/table-core'
import type { Post } from '~/types'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const query = ref('')
const queryDebounced = refDebounced(query, 500)

// Sort can be any post field or a field with a '-' prepended to make it descending
type SortKey = keyof Post | `-${keyof Post}`
const sort = ref<SortKey | undefined>()

const paginationPageIndex = ref(0)
const paginationPageSize = ref(10)
const paginationTotal = ref()

const columnFilters = ref([{
  id: 'title',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({})

const { data: response, status, execute } = await useFetch('/api/posts', {
  lazy: true,
  query: {
    q: queryDebounced,
    sort,
    pageIndex: paginationPageIndex,
    pageSize: paginationPageSize
  },
  watch: false
})

// change the page index to 0
// so that the new query is fetched from the first page
// and the fetch is triggered because paginationPageIndex changes
// if paginationPageIndex is already 0, the request should be manually triggered since
// the paginationPageIndex watch will not trigger
watch([queryDebounced, sort], () => {
  if (paginationPageIndex.value === 0) execute()
  paginationPageIndex.value = 0
})

// trigger a refetch when paginationPageIndex or paginationPageSize changes
// do NOT start at page 0
watch([paginationPageIndex, paginationPageSize], () => execute())

const data = ref<Post[]>()

watch(response, (newVal, oldVal) => {
  if (!newVal) throw new Error('Empty response from API for posts')
  paginationTotal.value = newVal.total
  if (newVal.pageIndex > (oldVal?.pageIndex || 0)) {
    paginationPageIndex.value = newVal.pageIndex
    data.value = [...(data.value || []), ...response.value?.data || []]
  } else {
    data.value = newVal?.data || []
  }
}, { immediate: true })

function getRowItems(row: Row<Post>) {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      label: 'Copy post ID',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'Copied to clipboard',
          description: 'Post ID copied to clipboard'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'View post details',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Edit post',
      icon: 'i-lucide-edit'
    },
    {
      type: 'separator'
    },
    {
      label: 'Delete post',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        toast.add({
          title: 'Post deleted',
          description: 'The post has been deleted.'
        })
      }
    }
  ]
}

const columns: TableColumn<Post>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      })
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      const isSorted = sort.value?.includes('title')
      const isSortedAscending = !sort.value?.startsWith('-')

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Title',
        icon: isSorted
          ? isSortedAscending
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => sort.value = isSortedAscending ? `-title` : 'title'
      })
    },
    cell: ({ row }) => {
      return h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.title),
        h('p', { class: 'text-sm text-muted line-clamp-1' }, row.original.excerpt)
      ])
    }
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => row.original.author
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'equals',
    cell: ({ row }) => {
      const color = {
        published: 'success' as const,
        draft: 'warning' as const,
        archived: 'neutral' as const
      }[row.original.status]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.original.status
      )
    }
  },
  {
    accessorKey: 'publishedAt',
    header: 'Published',
    cell: ({ row }) => {
      return new Date(row.original.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  },
  {
    accessorKey: 'views',
    header: () => h('div', { class: 'text-right' }, 'Views'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right' }, row.original.views.toLocaleString())
    }
  },
  {
    accessorKey: 'likes',
    header: () => h('div', { class: 'text-right' }, 'Likes'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right' }, row.original.likes.toLocaleString())
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
    }
  }
]

const statusFilter = ref('all')

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const statusColumn = table.value.tableApi.getColumn('status')
  if (!statusColumn) return

  if (newVal === 'all') {
    statusColumn.setFilterValue(undefined)
  } else {
    statusColumn.setFilterValue(newVal)
  }
})

const isEmpty = computed((): boolean => {
  if (status.value === 'pending') return false
  if (!data.value || data.value.length === 0) return true
  if (!table?.value?.tableApi) return false
  return table.value.tableApi.getFilteredRowModel().rows.length === 0
})

onMounted(() => {
  useInfiniteScroll(
    table.value?.$el,
    () => {
      paginationPageIndex.value += 1
    },
    {
      distance: 200,
      canLoadMore: () => {
        // If the total number of posts is less than the number of posts in the data
        // load more (when not already loading)
        if ((data.value?.length || 0) < paginationTotal.value) {
          console.log('loading more')
          return status.value !== 'pending'
        }
        return false
      }
    }
  )
})
</script>

<template>
  <UDashboardPanel id="posts">
    <template #header>
      <UDashboardNavbar title="Posts">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col flex-1 min-h-0">
        <div class="flex flex-wrap items-center justify-between gap-1.5 shrink-0">
          <UInput
            v-model="query"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Filter posts..."
          />

          <div class="flex flex-wrap items-center gap-1.5">
            <USelect
              v-model="statusFilter"
              :items="[
                { label: 'All', value: 'all' },
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' }
              ]"
              :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
              placeholder="Filter status"
              class="min-w-28"
            />
            <UDropdownMenu
              :items="
                table?.tableApi
                  ?.getAllColumns()
                  .filter((column: any) => column.getCanHide())
                  .map((column: any) => ({
                    label: upperFirst(column.id),
                    type: 'checkbox' as const,
                    checked: column.getIsVisible(),
                    onUpdateChecked(checked: boolean) {
                      table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                    },
                    onSelect(e?: Event) {
                      e?.preventDefault()
                    }
                  }))
              "
              :content="{ align: 'end' }"
            >
              <UButton
                label="Display"
                color="neutral"
                variant="outline"
                trailing-icon="i-lucide-settings-2"
              />
            </UDropdownMenu>
          </div>
        </div>

        <UTable
          ref="table"
          v-model:column-filters="columnFilters"
          v-model:column-visibility="columnVisibility"
          v-model:row-selection="rowSelection"
          sticky
          class="shrink-0 mt-5 h-[690px]"
          :data="data"
          :columns="columns"
          :loading="status === 'pending'"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default'
          }"
        >
          <template #empty>
            <UEmpty
              icon="i-lucide-file-text"
              title="No posts found"
              :description="data && data.length > 0
                ? 'No posts match your current filters. Try adjusting your search criteria.'
                : 'Get started by creating your first post.'"
              variant="naked"
              size="lg"
              class="flex-1 flex items-center justify-center py-12"
            />
          </template>
        </UTable>
        <div
          v-if="!isEmpty"
          class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto shrink-0"
        >
          <div class="text-sm text-muted">
            {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
            {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
