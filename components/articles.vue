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

const title = ref('')

watch($i18n.locale, () => {
  refreshNuxtData('headlines')
})
</script>

<template>
  <div class="article">
    <ArticleList v-if="headlines?.length" :headlines="headlines" @select="title = $event" />
    <div v-else class="article__list">
      <h2>{{ $t('no-headlines') }}</h2>
    </div>

    <ArticleSummary v-if="title.length" :title="title" />
    <div v-else class="article__summary">
      <h2>{{ $t('pick-article') }}</h2>
    </div>
  </div>
</template>
