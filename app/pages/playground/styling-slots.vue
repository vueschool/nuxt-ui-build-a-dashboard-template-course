<template>
  <div class=" p-10">
    <UCard
      class="bg-green-500"
      :ui="{ header: 'bg-green-500' }"
      variant="solid"
    >
      <template #header>
        <h1>How to Style Component Slots</h1>
      </template>
      <template #default>
        <p>Hello</p>
      </template>
    </UCard>
  </div>
</template>
