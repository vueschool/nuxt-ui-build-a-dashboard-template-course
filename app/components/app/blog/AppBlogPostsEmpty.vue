<script setup lang="ts">
withDefaults(defineProps<{
  description?: string
  title?: string
}>(), {
  description: 'No posts match your current filters. Try adjusting your search criteria or create a new post.',
  title: 'No posts found'
})
</script>

<template>
  <UEmpty
    icon="i-lucide-file-text"
    :title="title"
    :description="description"
    variant="naked"
    size="lg"
    class="flex-1 flex items-center justify-center py-12"
  />
</template>
