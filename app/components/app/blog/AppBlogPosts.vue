<script setup lang="ts">
import type { Post } from '~/types'

interface Props {
  posts: Post[]
  orientation?: 'horizontal' | 'vertical'
  loading?: boolean
  loadingMore?: boolean
  empty?: boolean
  skeletonCount?: number
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  loading: false,
  skeletonCount: 8
})
</script>

<template>
  <div>
    <div
      v-if="loading"
      :class="[
        'pb-4',
        orientation === 'horizontal' ? 'sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : ''
      ]"
    >
      <AppBlogPostsSkeleton :count="skeletonCount" />
    </div>
    <AppBlogPostsEmpty v-else-if="empty" />
    <UBlogPosts
      v-else
      :orientation="orientation"
      :class="[
        'pb-4',
        orientation === 'horizontal' ? 'sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4!' : ''
      ]"
    >
      <AppBlogPost
        v-for="(post) in posts"
        :key="post.id"
        v-bind="post"
      />
    </UBlogPosts>
    <!-- Loading indicator at bottom when loading more -->
    <div v-if="loadingMore" class="flex items-center justify-center py-8">
      <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin text-muted" />
    </div>
  </div>
</template>
