<script setup lang="ts">
import { FwbSelect, FwbToggle } from 'flowbite-vue'

import useSettingsStore, { AVAILABLE_GAMES, SOCIAL_MEDIA } from '~/store/settings.store'

const settingsStore = useSettingsStore()

const games = computed(() => AVAILABLE_GAMES.map((game) => ({ value: game, name: game })))
const shorts = computed(() => SOCIAL_MEDIA.map((sm) => ({ value: sm, name: sm })))
</script>

<template>
  <div class="settings-tab w-full h-full flex flex-col gap-4">
    <span class="inline-flex justify-between items-center">{{ $t('change-theme') }}<ThemeSwitcher /></span>

    <LanguageSwitcher />

    <FwbSelect v-model="settingsStore.game" :options="games" />
    <FwbSelect v-model="settingsStore.shorts" :options="shorts" />

    <span class="inline-flex justify-between">
      {{ $t('focus-mode') }}
      <FwbToggle v-model="settingsStore.focusMode" />
    </span>
  </div>
</template>
