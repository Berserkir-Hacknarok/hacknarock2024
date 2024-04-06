<script setup lang="ts">
import getRandomVideo from '~/helpers/getRandomVideo'
import useSettingsStore from '~/store/settings.store'

import type { Platform } from '~/settings/constants'

const settingsStore = useSettingsStore()

const linkId = computed(() => getRandomVideo(settingsStore.shorts as Platform))
</script>

<template>
  <div class="shorts-tab h-full w-full">
    <blockquote
      v-if="settingsStore.shorts === 'tiktok'"
      id="shorts-iframe"
      class="tiktok-embed w-full h-full"
      :cite="linkId"
      :data-video-id="`https://www.tiktok.com/@scout2015/video/${linkId}`"
    >
      <section></section>
    </blockquote>

    <iframe
      v-else-if="settingsStore.shorts === 'facebook'"
      id="shorts-iframe"
      :src="`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${linkId}%2F&show_text=false`"
      class="facebook-embed w-full h-full"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
    >
    </iframe>

    <iframe
      v-else-if="settingsStore.shorts === 'instagram'"
      id="shorts-iframe"
      :src="`https://www.instagram.com/reel/${linkId}/embed/`"
      class="instagram-embed w-full h-full"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; web-share"
    >
      Iframe not supported
    </iframe>

    <iframe
      v-else-if="settingsStore.shorts === 'youtube'"
      id="shorts-iframe"
      :src="`https://www.youtube.com/embed/${linkId}`"
      class="youtube-embed w-full h-full"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; web-share"
    ></iframe>
  </div>
</template>
