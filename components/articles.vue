<script setup lang="ts">
const $i18n = useI18n()

const currentCountry = computed(
  () =>
    $i18n.locales.value
      .find((locale) => locale.code === $i18n.locale.value)
      ?.iso?.split('-')[1]
      .toLowerCase() || 'us'
)

const { data: headlines } = useAsyncData(
  'headlines',
  async () => (await $fetch(`/api/article/headlines?country=${currentCountry.value}`)).results
)

watch($i18n.locale, () => {
  refreshNuxtData('headlines')
})
</script>

<template>
  <div class="article">
    <ArticleList :headlines="headlines" />
    <ArticleSummary />
  </div>
</template>
