<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 1
})
</script>

<template>
  <div
    v-for="i in count"
    :key="`skeleton-${i}`"
    class="relative group/blog-post flex flex-col rounded-lg overflow-hidden bg-default ring ring-default"
  >
    <!-- Image skeleton -->
    <div class="relative overflow-hidden aspect-[16/9] w-full">
      <USkeleton class="w-full h-full" />
    </div>
    <!-- Body skeleton -->
    <div class="min-w-0 flex-1 flex flex-col p-4 sm:p-6">
      <!-- Badge and date skeleton -->
      <div class="flex items-center gap-2 mb-2">
        <USkeleton class="h-5 w-16 rounded-full" />
        <USkeleton class="h-4 w-24" />
      </div>
      <!-- Title skeleton -->
      <USkeleton class="h-6 w-full mb-2" />
      <USkeleton class="h-6 w-3/4 mb-3" />
      <!-- Description skeleton -->
      <USkeleton class="h-4 w-full mb-1" />
      <USkeleton class="h-4 w-5/6 mb-4" />
      <!-- Author skeleton -->
      <div class="pt-4 mt-auto flex items-center gap-3">
        <USkeleton class="h-8 w-8 rounded-full" />
        <div class="flex-1">
          <USkeleton class="h-4 w-24 mb-1" />
          <USkeleton class="h-3 w-32" />
        </div>
      </div>
    </div>
  </div>
</template>
