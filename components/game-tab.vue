<script setup lang="ts">
import useSettingsStore from '~/store/settings.store'

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="game-tab flex justify-center items-start w-full h-full">
    <iframe
      id="game-iframe"
      :src="`https://dddavit.github.io/${settingsStore.game}/`"
      class="w-full h-full aspect-[9/16]"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
</template>
