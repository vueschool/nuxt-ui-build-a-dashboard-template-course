<script setup lang="ts">
const model = defineModel<string>()

const onFileChange = (e: Event) => {
  if (!e.target || !(e.target instanceof HTMLInputElement)) {
    console.error('Invalid event target')
    return
  }
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    model.value = URL.createObjectURL(file)
  } else {
    console.log('Avatar removed')
  }
}

const inputEl = useTemplateRef('input')

const items = [{
  label: 'Edit',
  icon: 'i-lucide-edit',
  onSelect: () => {
    const input = inputEl.value?.inputRef
    if (input) input.click()
  }
}, {
  label: 'Remove',
  icon: 'i-lucide-trash',
  onSelect: () => {
    const input = inputEl.value?.inputRef
    if (input) input.value = ''
    model.value = undefined
  }
}]
</script>

<template>
  <div class="flex justify-center">
    <UInput
      ref="input"
      type="file"
      class="hidden"
      accept=".jpg, .jpeg, .png, .gif"
      @change="onFileChange"
    />
    <UDropdownMenu :items="items">
      <div>
        <UButton
          v-if="model"
          square
          :avatar="{ src: model, size: '3xl' }"
          color="neutral"
          variant="ghost"
          class="rounded-full"
        />
        <UButton
          v-else
          icon="i-lucide-image"
          :ui="{ leadingIcon: 'size-1/2' }"
          square
          color="neutral"
          class="rounded-full relative size-[60px] flex items-center justify-center"
        />
      </div>
    </UDropdownMenu>
  </div>
</template>
