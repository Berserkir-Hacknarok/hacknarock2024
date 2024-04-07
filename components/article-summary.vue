<script setup lang="ts">
import { FwbButton, FwbSpinner } from 'flowbite-vue'

const $i18n = useI18n()

const $props = defineProps<{
  title: string
}>()

const currentLocale = computed(
  () =>
    $i18n.locales.value.find((locale) => locale.code === $i18n.locale.value) || {
      name: 'English',
      code: 'en',
      iso: 'en-US'
    }
)

const { data: article, pending } = useLazyAsyncData<string>(
  'article',
  async () =>
    (
      await $fetch<{ statusCode: number; results: string[] }>(
        `/api/article/${$props.title}?language=${currentLocale.value.name}`
      )
    ).results[0]
)

watch($props, async () => {
  await refreshNuxtData('article')
})

function speak(msg: string) {
  const speech = new SpeechSynthesisUtterance(msg)

  speech.lang = currentLocale.value.iso || 'en-US'

  window.speechSynthesis.speak(speech)
}
</script>

<template>
  <div class="article__summary h-full w-full">
    <h2>{{ $props.title }}</h2>

    <div v-if="pending" class="w-full h-[calc(100%_-_4rem)] flex flex-col items-center justify-center">
      <fwb-spinner size="12" />
      <h3 class="text-2xl mt-4">{{ $t('loading') }}</h3>
    </div>

    <p v-else class="p-2 h-[calc(100%_-_4rem)] overflow-y-auto">{{ article }}</p>

    <FwbButton v-if="article" class="flowbite w-full" @click="speak(article)">{{ $t('read') }}</FwbButton>
  </div>
</template>
