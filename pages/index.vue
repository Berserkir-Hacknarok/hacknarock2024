<script setup lang="ts">
const { data: translations } = useAsyncData('translations', async() => (await $fetch('/api/test')).results)
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="container mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">karol patrz, umiem gita</h1>

        {{ translations }}

        <nuxt-link to="/login" class="mt-4 text-blue-500">Login</nuxt-link>
      </div>
    </NuxtLayout>
  </div>
</template>
