<script setup lang="ts">
const { data: translations } = useAsyncData('translations', async () => (await $fetch('/api/test')).results)
</script>

<template>
  <div class="header">
    <h1 class="text-4xl font-bold">Hacknarok</h1>

    {{ translations }}
  </div>
</template>
