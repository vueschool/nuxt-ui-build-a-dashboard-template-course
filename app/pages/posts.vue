<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { Post } from '~/types'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'title',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({})

const { data, status } = await useFetch<Post[]>('/api/posts', {
  lazy: true
})

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
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Title',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
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

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

const isEmpty = computed((): boolean => {
  if (status.value === 'pending') return false
  if (!data.value || data.value.length === 0) return true
  if (!table?.value?.tableApi) return false
  return table.value.tableApi.getFilteredRowModel().rows.length === 0
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
            :model-value="(table?.tableApi?.getColumn('title')?.getFilterValue() as string)"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Filter posts..."
            @update:model-value="table?.tableApi?.getColumn('title')?.setFilterValue($event)"
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
          v-model:pagination="pagination"
          :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
          class="shrink-0 mt-5"
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

          <div class="flex items-center gap-1.5">
            <UPagination
              :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
              :items-per-page="table?.tableApi?.getState().pagination.pageSize"
              :total="table?.tableApi?.getFilteredRowModel().rows.length"
              @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
            />
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

