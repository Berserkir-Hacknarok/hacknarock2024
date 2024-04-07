<script setup lang="ts">
const FreeTime = ['game-iframe', 'shorts-iframe']
const WorkTime = ['code-editor-iframe', 'wolfree-iframe', 'notes-element']

// const BREAK_TIME = 180
const BREAK_TIME = 5
// const WORK_TIME_MULTIPLIER = 10
const WORK_TIME_MULTIPLIER = 2

const breakimeLeft = ref(BREAK_TIME)

onMounted(() => {
  setInterval(() => {
    const activeElement = document.activeElement as HTMLElement | null
    const gameIframe = document.getElementById('game-iframe') as HTMLIFrameElement
    const shortsIframe = document.getElementById('shorts-iframe') as HTMLIFrameElement

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
