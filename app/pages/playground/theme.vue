<script setup lang="ts">
const appConfig = useAppConfig()

function changeTheme(t: 'brutalist' | 'happy') {
  import(`@/themes/${t}/theme.ts`).then((themeConfig) => {
    updateAppConfig({ ui: { ...appConfig.ui, ...themeConfig.default } })
    console.log(appConfig.ui)
  })
}
</script>

<template>
  <div class=" p-10">
    <UCard>
      <template #header>
        <h1>Dynamic Theme Example</h1>
      </template>
      <template #default>
        <p>This is the card body content</p>
      </template>
    </UCard>
    <div class="flex gap-2 mt-4">
      <UButton color="secondary" variant="soft" @click="changeTheme('brutalist')">
        Brutalist
      </UButton>
      <UButton color="secondary" variant="soft" @click="changeTheme('happy')">
        Happy
      </UButton>
    </div>
  </div>
</template>
