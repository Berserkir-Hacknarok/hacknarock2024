import type { IArticleResponse } from '~/interfaces'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { country } = getQuery(event)

  const res = await $fetch<IArticleResponse>(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${runtimeConfig.NEWSAPI_API_KEY}`
  )

  return {
    statusCode: 200,
    results: res.articles
  }
})
