<script setup lang="ts">
import type { ColumnDef as TableColumn } from '@tanstack/vue-table'
import { upperFirst } from 'scule'
import type { Row } from '@tanstack/table-core'
import type { Post } from '~/types'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()

// View mode: 'table' or 'cards'
const viewMode = ref<'table' | 'cards'>('table')

// Filters
const filters = ref({
  status: 'all' as Post['status'] | 'all'
})
const table = useTemplateRef('table')
const cardsContainer = useTemplateRef('cardsContainer')

const {
  data,
  status,
  query,
  isEmpty,
  toggleSort,
  getSortIcon,
  ssrPaginatedData
} = usePaginatedData<Post>({
  endpoint: '/api/posts',
  filters,
  infiniteScrollElement: (): HTMLElement | undefined =>
    viewMode.value === 'table' ? table.value?.$el : cardsContainer.value || undefined
})

await ssrPaginatedData()

const columnFilters = ref([{
  id: 'title',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({})

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
    header: () => {
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Title',
        icon: getSortIcon('title'),
        class: '-mx-2.5',
        onClick: () => toggleSort('title')
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

    cell: ({ row }) => row.original.author,
    header: () => {
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Author',
        icon: getSortIcon('author'),
        class: '-mx-2.5',
        onClick: () => toggleSort('author')
      })
    }
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

// Transform Post data to BlogPost format
function transformPostToBlogPost(post: Post) {
  const statusColor = {
    published: 'success' as const,
    draft: 'warning' as const,
    archived: 'neutral' as const
  }[post.status]

  return {
    title: post.title,
    description: post.excerpt,
    date: post.publishedAt,
    image: post.image,
    badge: {
      label: post.status.charAt(0).toUpperCase() + post.status.slice(1),
      color: statusColor,
      variant: 'subtle' as const
    },
    authors: [{
      name: post.author,
      description: `${post.views.toLocaleString()} views • ${post.likes.toLocaleString()} likes`
    }]
  }
}

const blogPosts = computed(() => data.value?.map(transformPostToBlogPost) || [])
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
              v-model="filters.status"
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
              v-if="viewMode === 'table'"
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
            <UFieldGroup>
              <UButton
                :color="viewMode === 'table' ? 'primary' : 'neutral'"
                :variant="viewMode === 'table' ? 'solid' : 'outline'"
                icon="i-lucide-table"
                :aria-label="viewMode === 'table' ? 'Table view active' : 'Switch to table view'"
                @click="viewMode = 'table'"
              />
              <UButton
                :color="viewMode === 'cards' ? 'primary' : 'neutral'"
                :variant="viewMode === 'cards' ? 'solid' : 'outline'"
                icon="i-lucide-layout-grid"
                :aria-label="viewMode === 'cards' ? 'Cards view active' : 'Switch to cards view'"
                @click="viewMode = 'cards'"
              />
            </UFieldGroup>
          </div>
        </div>

        <!-- Table View -->
        <UTable
          v-if="viewMode === 'table'"
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

        <!-- Cards View -->
        <div
          v-else
          ref="cardsContainer"
          class="shrink-0 mt-5 flex-1 min-h-0 overflow-y-auto"
        >
          <div v-if="status === 'pending' && data.length === 0" class="flex items-center justify-center py-12">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-muted" />
          </div>
          <UBlogPosts
            v-else-if="!isEmpty && blogPosts.length > 0"
            orientation="horizontal"
            class="pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <UBlogPost
              v-for="(post, index) in blogPosts"
              :key="`post-${post.title}-${index}`"
              v-bind="post"
              variant="outline"
            />
          </UBlogPosts>
          <UEmpty
            v-else
            icon="i-lucide-file-text"
            title="No posts found"
            :description="data && data.length > 0
              ? 'No posts match your current filters. Try adjusting your search criteria.'
              : 'Get started by creating your first post.'"
            variant="naked"
            size="lg"
            class="flex-1 flex items-center justify-center py-12"
          />
          <!-- Loading indicator at bottom when loading more -->
          <div v-if="status === 'pending' && data.length > 0" class="flex items-center justify-center py-8">
            <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin text-muted" />
          </div>
        </div>

        <!-- Footer with selection info (only for table view) -->
        <div
          v-if="!isEmpty && viewMode === 'table'"
          class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto shrink-0"
        >
          <div class="text-sm text-muted">
            {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
            {{ data?.length || 0 }} row(s) selected.
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
