<script setup lang="ts">
import { FwbA, FwbButton, FwbSpinner } from 'flowbite-vue'

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

const { data: article, pending } = useLazyAsyncData<{ summary: string; url: string }>(
  'article',
  async () =>
    (
      await $fetch<{ statusCode: number; results: { summary: string; url: string }[] }>(
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
  <div class="article__summary h-full w-full flex flex-col gap-4">
    <h2>{{ $props.title }}</h2>

    <FwbA v-if="article" :href="article.url" target="_blank">{{ $t('read-more') }}</FwbA>

    <div v-if="pending" class="w-full h-[calc(100%_-_4rem)] flex flex-col items-center justify-center">
      <fwb-spinner size="12" />
      <h3 class="text-2xl mt-4">{{ $t('loading') }}</h3>
    </div>

    <p v-else-if="article" class="px-2 h-[calc(100%_-_4rem)] overflow-y-auto">{{ article.summary }}</p>

    <FwbButton v-if="article" class="flowbite w-full" @click="speak(article.summary)">{{ $t('read') }}</FwbButton>
  </div>
</template>
