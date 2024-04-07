<script setup lang="ts">
import { BREAK_TIME, WORK_TIME_MULTIPLIER } from '~/settings/constants'
import useSettingsStore from '~/store/settings.store'

const settingsStore = useSettingsStore()

const FreeTime = ['game-iframe', 'shorts-iframe']
const WorkTime = ['code-editor-iframe', 'wolfree-iframe', 'notes-element']

const breakimeLeft = ref(BREAK_TIME)

onMounted(() => {
  setInterval(() => {
    const gameIframe = document.getElementById('game-iframe') as HTMLIFrameElement
    const shortsIframe = document.getElementById('shorts-iframe') as HTMLIFrameElement

    if (!settingsStore.focusMode) {
      gameIframe.style.filter = 'blur(0px)'
      shortsIframe.style.filter = 'blur(0px)'
      return
    }

    const activeElement = document.activeElement as HTMLElement | null

    if (!activeElement) {
      return
    }

    if (FreeTime.includes(activeElement.id)) {
      breakimeLeft.value = breakimeLeft.value > BREAK_TIME ? BREAK_TIME : breakimeLeft.value
      breakimeLeft.value -= 0.1

      if (breakimeLeft.value <= 0) {
        gameIframe.style.filter = `blur(${-breakimeLeft.value / 2}px)`
        shortsIframe.style.filter = `blur(${-breakimeLeft.value / 2}px)`
      }
    } else if (WorkTime.includes(activeElement.id)) {
      breakimeLeft.value += 0.1

      if (breakimeLeft.value >= BREAK_TIME * WORK_TIME_MULTIPLIER) {
        breakimeLeft.value = BREAK_TIME
        gameIframe.style.filter = 'blur(0px)'
        shortsIframe.style.filter = 'blur(0px)'
      }
    }
  }, 100)
})
</script>

<template>
  <div>
    <NuxtLayout>
      <AppTabs />
      <CodeEditor />
    </NuxtLayout>
  </div>
</template>
