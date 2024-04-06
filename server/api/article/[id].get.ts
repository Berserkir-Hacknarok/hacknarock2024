const API_KEY = '41a71c2c07364a64abf785aa5afa02ca'

interface IArticleSource {
  id: string
  name: string
}

interface IArticle {
  source: IArticleSource
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface IArticleResponse {
  status: string
  totalResults: number
  articles: IArticle[]
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const res = await $fetch<IArticleResponse>(
    `https://newsapi.org/v2/everything?q=${id}&searchIn=title&apiKey=${API_KEY}`
  )

  return {
    statusCode: 200,
    results: res.articles
  }
})
