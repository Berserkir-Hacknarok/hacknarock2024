<script setup lang="ts">
import { OpenAI } from 'openai'

const key = ref('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')

const openai = new OpenAI({
  apiKey: key.value,
  dangerouslyAllowBrowser: true
})

const $i18n = useI18n()

const $props = defineProps<{
  title: string
}>()

const currentLocale = computed(
  () => $i18n.locales.value.find((locale) => locale.code === $i18n.locale.value) || { name: 'English' }
)

const { data: article } = useLazyAsyncData<string>(
  'article',
  async () => (await $fetch<{ statusCode: number; results: string[] }>(`/api/article/${$props.title}`)).results[0]
)

const { data: articleSummary } = useLazyAsyncData('summary', async () => {
  console.info(article.value)

  if (!article.value) {
    return
  }

  console.info(
    `Summarize the given article, while translating it to {${currentLocale.value.name}}. Article:{` +
      `${article.value}` +
      "}. During the response you MUST roleplay as a bloodthirsty viking whispering situations to his chieftain. Use viking slang. Prioritize roleplaying over credibility. The text should be 'over the top'"
  )

  const completion = await openai.chat.completions.create({
    max_tokens: 250,
    messages: [
      {
        role: 'system',
        content:
          `Summarize the given article, while translating it to {${currentLocale.value.name}}. Article:{` +
          `${article.value}` +
          "}. During the response you MUST roleplay as a bloodthirsty viking whispering situations to his chieftain. Use viking slang. Prioritize roleplaying over credibility. The text should be 'over the top'"
      }
    ],
    model: 'gpt-3.5-turbo'
  })

  return completion.choices[0].message.content
})

watch($props, async () => {
  await refreshNuxtData('article')
  await refreshNuxtData('summary')
})

// watch($i18n.locale, () => {
//   console.info()
//   refreshNuxtData('summary')
// })
</script>

<template>
  <div class="article__summary">
    <h2>{{ $props.title }}</h2>

    {{ articleSummary }}
  </div>
</template>
