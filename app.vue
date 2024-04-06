<script setup lang="ts">
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

onMounted(() => {
  initFlowbite()

  if ($pwa?.offlineReady) {
    alert('App ready to work offline')
  }

  if ($pwa?.needRefresh) {
    const refresh = prompt('App needs refresh. Do you want to do that now?')

    if (!refresh) {
      return
    }

    reloadNuxtApp({
      persistState: true
    })
  }
})

useHead({
  script: [
    {
      src: 'https://www.tiktok.com/embed.js',
      defer: true
    }
  ]
})

</script>

<template>
  <div>
    <VitePwaManifest />
    <Head>
      <!-- script async src="https://www.tiktok.com/embed.js"></script> -->
    </Head>
    <NuxtPage />
  </div>
</template>
