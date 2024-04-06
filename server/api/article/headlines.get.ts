import type { IArticleResponse } from '~/interfaces'

const API_KEY = '41a71c2c07364a64abf785aa5afa02ca'

export default defineEventHandler(async (event) => {
  const { country } = getQuery(event)

  const res = await $fetch<IArticleResponse>(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
  )

  return {
    statusCode: 200,
    results: res.articles
  }
})
