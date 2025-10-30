<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Member } from '~/types'

const props = defineProps<{
  member?: Member
}>()

const { roles } = useAppConfig()
const roleItems = roles.slice()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  role: z.enum(roles),
  avatar: z.object({
    src: z.url('Invalid URL').optional()
  })
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  username: '',
  role: 'member',
  avatar: { src: '' }
})

watch(() => props.member, (member) => {
  if (!member) return
  state.name = member.name
  state.username = member.username
  state.role = member.role
  state.avatar = { src: member.avatar?.src || '' }
}, { immediate: true })

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 p-8"
    @submit="onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>

    <UFormField label="Username" name="username">
      <UInput v-model="state.username" class="w-full" />
    </UFormField>

    <UFormField label="Role" name="role">
      <USelect
        v-model="state.role"
        class="w-full capitalize"
        :items="roleItems"
        color="neutral"
        :ui="{ item: 'capitalize' }"
      />
    </UFormField>

    <UFormField label="Avatar URL" name="avatar.src">
      <UInput v-model="state.avatar!.src" class="w-full" placeholder="https://..." />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
