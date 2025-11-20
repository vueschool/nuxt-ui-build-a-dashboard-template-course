<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

import type { Member } from '~/types'

const props = defineProps<{
  members: Member[]
}>()

defineEmits<{
  invite: []
  refresh: []
}>()

const route = useRoute()

const activeMemberUsername = computed<string | undefined>(() => {
  const action = route.params.path?.[0]?.toString()
  return action === 'edit' ? route.params.path?.[1]?.toString() : undefined
})

const activeMember = ref<Member | undefined>(
  props.members.find(member => member.username === activeMemberUsername.value)
)

const items = (member: Member) => [{
  label: 'Edit member',
  onSelect: () => {
    navigateTo(`/settings/members/edit/${member.username}`)
    setTimeout(() => activeMember.value = member, 1)
  }
}, {
  label: 'Remove member',
  color: 'error' as const,
  onSelect: () => console.log('Remove member')
}] satisfies DropdownMenuItem[]

const open = computed({
  get: () => !!activeMember.value,
  set: (value) => {
    if (!value) {
      activeMember.value = undefined
      setTimeout(() => navigateTo('/settings/members'), 1)
    }
  }
})
</script>

<template>
  <USlideover v-model:open="open" title="Edit member" :description="`Editing ${activeMember?.name}`">
    <template #content>
      <SettingsMemberEditForm :member="activeMember" />
    </template>
  </USlideover>
  <ul v-if="members.length > 0" role="list" class="divide-y divide-default">
    <li
      v-for="(member, index) in members"
      :key="index"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          v-bind="member.avatar"
          size="md"
        />

        <div class="text-sm min-w-0">
          <p class="text-highlighted font-medium truncate">
            {{ member.name }}
          </p>
          <p class="text-muted truncate">
            {{ member.username }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <USelect
          :model-value="member.role"
          :items="['member', 'owner']"
          color="neutral"
          :ui="{ value: 'capitalize', item: 'capitalize' }"
        />

        <UDropdownMenu :items="items(member)" :content="{ align: 'end' }">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </div>
    </li>
  </ul>
  <UEmpty
    v-else
    icon="i-lucide-users"
    title="No members found"
    description="It looks like you haven't added any members. Invite a member to get started."
    :actions="[
      {
        icon: 'i-lucide-plus',
        label: 'Invite member',
        onClick: () => $emit('invite')
      },
      {
        icon: 'i-lucide-refresh-cw',
        label: 'Refresh',
        color: 'neutral',
        variant: 'subtle',
        onClick: () => $emit('refresh')
      }
    ]"
  />
</template>
