<script setup lang="ts">
import { FwbSpinner } from 'flowbite-vue'

const $i18n = useI18n()

const $props = defineProps<{
  title: string
}>()

const currentLocale = computed(
  () => $i18n.locales.value.find((locale) => locale.code === $i18n.locale.value) || { name: 'English' }
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

// watch($i18n.locale, () => {
//   console.info()
//   refreshNuxtData('summary')
// })
</script>

<template>
  <div class="article__summary">
    <h2>{{ $props.title }}</h2>

    <div v-if="pending" class="w-full h-full flex flex-col items-center justify-center">
      <fwb-spinner size="12" />
      <h3 class="text-2xl mt-4">{{ $t('loading') }}</h3>
    </div>

    <p v-else class="p-2">{{ article }}</p>
  </div>
</template>
