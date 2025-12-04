<script setup lang="ts">
import OriginalNuxtImg, { imgProps } from '#image/components/NuxtImg.vue'

/**
you would think this would work, but it doesn't
elusive error "Invalid count value: -36"
import type { ExtractPropTypes } from 'vue'
type NuxtImgProps = ExtractPropTypes<typeof imgProps>
const props = defineProps<NuxtImgProps & { skeleton?: boolean }>(imgProps)
 */

const props = defineProps({
  ...imgProps,
  skeleton: {
    type: Boolean,
    default: true
  }
})

defineEmits(['load'])
const attrs = useAttrs()
const loaded = ref(false)
</script>

<template>
  <USkeleton
    v-if="!loaded && skeleton"
    :width="props.width"
    :height="props.height"
    v-bind="attrs"
  />
  <OriginalNuxtImg v-show="loaded || !skeleton" v-bind="{ ...attrs, ...props }" @load="loaded = true; $emit('load')" />
</template>
