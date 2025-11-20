import type { InternalApi } from 'nitropack/types'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  pageIndex: number
}

// Sort can be any field or a field with a '-' prepended to make it descending
export type SortKey<T> = keyof T | `-${string & keyof T}`

export interface UsePaginatedDataOptions {
  endpoint: keyof InternalApi
  queryDebounce?: number
  initialPageSize?: number
  filters?: MaybeRefOrGetter<Record<string, unknown>>
  infiniteScrollElement?: MaybeRefOrGetter<HTMLElement | undefined>
  infiniteScrollDistance?: number
  enableInfiniteScroll?: MaybeRefOrGetter<boolean>
}

export function usePaginatedData<T = unknown>(options: UsePaginatedDataOptions) {
  const {
    endpoint,
    queryDebounce = 500,
    initialPageSize = 10,
    filters = {},
    infiniteScrollElement,
    infiniteScrollDistance = 100,
    enableInfiniteScroll = true
  } = options

  const data = ref<T[]>([])

  const query = ref('')
  const queryDebounced = refDebounced(query, queryDebounce)

  const sort = ref<SortKey<T> | undefined>()

  const paginationPageIndex = ref(0)
  const paginationPageSize = ref(initialPageSize)
  const paginationTotal = ref<number>()

  // Build query object with custom filters
  const queryParams = computed(() => {
    const params: Record<string, unknown> = {
      q: queryDebounced.value,
      sort: sort.value,
      pageIndex: paginationPageIndex.value,
      pageSize: paginationPageSize.value
    }

    // Merge custom filters
    const filtersValue = toValue(filters)
    Object.entries(filtersValue).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = unref(value)
      }
    })

    return params
  })

  const { data: response, status, execute } = useFetch<PaginatedResponse<T>>(endpoint,
    {
      // can override lazy
      lazy: true,
      query: queryParams,
      // cannot override watch
      watch: false
    })

  // Reset to page 0 when search/sort/filters change
  // and trigger refetch if already on page 0
  watch([queryDebounced, sort, () => toValue(filters)], () => {
    if (paginationPageIndex.value === 0) {
      execute()
    }
    paginationPageIndex.value = 0
  }, { deep: true })

  // Trigger refetch when pagination changes
  watch([paginationPageIndex, paginationPageSize], () => {
    execute()
  })

  watch(response, (newVal, oldVal) => {
    if (!newVal) return

    paginationTotal.value = newVal.total

    // If loading a new page (infinite scroll), accumulate data
    if (newVal.pageIndex > (oldVal?.pageIndex || 0) && enableInfiniteScroll) {
      const scrollElement = toValue(infiniteScrollElement)
      // Save scroll position before updating data
      const scrollTop = scrollElement?.scrollTop || 0

      paginationPageIndex.value = newVal.pageIndex
      data.value = [...(data.value || []), ...(newVal.data || [])] as T[]

      // Restore scroll position after DOM update
      // Use requestAnimationFrame to ensure DOM has fully updated
      nextTick(() => {
        if (scrollElement) {
          // Restore the exact scroll position - new content is added at bottom
          // so scrollTop should remain the same
          scrollElement.scrollTop = scrollTop
        }
      })
    } else {
      // Otherwise, replace data (new search/filter/sort)
      data.value = newVal.data || []
      nextTick(() => {
        toValue(infiniteScrollElement)?.scrollTo({ top: 0 })
        if (enableInfiniteScroll) {
          resetInfiniteScroll()
        }
      })
    }
  }, { immediate: true })

  const isEmpty = computed((): boolean => {
    if (status.value === 'pending') return false
    return !data.value || data.value.length === 0
  })

  const canLoadMore = computed((): boolean => {
    if (!enableInfiniteScroll) return false
    if (status.value === 'pending') return false
    return (data.value?.length || 0) < (paginationTotal.value || 0)
  })

  function loadMore() {
    paginationPageIndex.value += 1
  }

  function reset() {
    paginationPageIndex.value = 0
    query.value = ''
    sort.value = undefined
    data.value = []
  }

  /**
   * Check if a column is currently being used for sorting
   * @param columnKey - The column key to check
   * @returns Object with `isSorted` boolean and `direction` ('asc' | 'desc' | null)
   */
  function getSortInfo<K extends keyof T>(columnKey: K) {
    const currentSort = sort.value
    if (!currentSort) {
      return { isSorted: false, direction: null as 'asc' | 'desc' | null }
    }

    const sortStr = String(currentSort)
    const sortKey = sortStr.startsWith('-') ? sortStr.slice(1) : sortStr
    const columnKeyStr = String(columnKey)
    const isSorted = sortKey === columnKeyStr
    const direction: 'asc' | 'desc' | null = isSorted
      ? (sortStr.startsWith('-') ? 'desc' : 'asc')
      : null

    return { isSorted, direction }
  }

  /**
   * Toggle sort for a column (asc -> desc -> none)
   * @param columnKey - The column key to sort by
   */
  function toggleSort<K extends keyof T>(columnKey: K) {
    const { isSorted, direction } = getSortInfo(columnKey)
    if (!isSorted) {
      sort.value = columnKey as SortKey<T>
    } else if (direction === 'asc') {
      sort.value = `-${String(columnKey)}` as SortKey<T>
    } else {
      sort.value = undefined
    }
  }

  /**
   * Set sort for a column (ascending)
   * @param columnKey - The column key to sort by
   */
  function setSortAsc<K extends keyof T>(columnKey: K) {
    sort.value = columnKey as SortKey<T>
  }

  /**
   * Set sort for a column (descending)
   * @param columnKey - The column key to sort by
   */
  function setSortDesc<K extends keyof T>(columnKey: K) {
    sort.value = `-${String(columnKey)}` as SortKey<T>
  }

  function getSortIcon<K extends keyof T>(columnKey: K) {
    const { isSorted, direction } = getSortInfo(columnKey)
    if (!isSorted) return 'i-lucide-arrow-up-down'
    if (direction === 'asc') return 'i-lucide-arrow-up-narrow-wide'
    return 'i-lucide-arrow-down-wide-narrow'
  }

  const { reset: resetInfiniteScroll } = useInfiniteScroll(
    infiniteScrollElement,
    () => {
      loadMore()
    },
    {
      distance: infiniteScrollDistance,
      canLoadMore: () => canLoadMore.value
    }
  )

  const ssrPaginatedData = async () => {
    const res = await useAsyncData<PaginatedResponse<T>>(() => {
      const res = $fetch<PaginatedResponse<T>>(endpoint,
        {
          query: queryParams.value
        })
      return res
    })

    data.value = res.data.value?.data || []
    paginationTotal.value = res.data.value?.total || undefined
    paginationPageIndex.value = res.data.value?.pageIndex || 0
    return res
  }

  return {
    // Data
    data,
    status,

    // Pagination
    pageIndex: paginationPageIndex,
    pageSize: paginationPageSize,
    total: paginationTotal,
    infiniteScrollElement,

    // Search & Sort
    query,
    sort,

    // Computed
    isEmpty,
    canLoadMore,

    // Methods
    execute,
    ssrPaginatedData,
    loadMore,
    reset,
    getSortInfo,

    // Sort Methods
    toggleSort,
    setSortAsc,
    setSortDesc,
    getSortIcon
  }
}
