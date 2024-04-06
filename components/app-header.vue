<script setup lang="ts">
const { data: translations } = useAsyncData('translations', async () => (await $fetch('/api/test')).results)
const { data: headlines } = useAsyncData(
  'headlines',
  async () => (await $fetch('/api/article/headlines?country=pl')).results
)
</script>

<template>
  <div class="header">
    <h1 class="text-4xl font-bold">Hacknarok</h1>

    {{ translations }}
    {{ headlines }}
  </div>
</template>
