<script setup lang="ts">
import type { Post } from '~/types'

const post = defineProps<Post>()

// Transform Post data to BlogPost format
const blogPost = computed(() => {
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
})
</script>

<template>
  <UBlogPost
    v-bind="blogPost"
    variant="outline"
  />
</template>
