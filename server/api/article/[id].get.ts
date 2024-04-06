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

  const title = decodeURIComponent(id)
  const parsedTitle = title.slice(0, title.lastIndexOf(' - ') === -1 ? title.length : title.lastIndexOf(' - '))

  try {
    const res: IArticleResponse = await $fetch(
      `https://newsapi.org/v2/everything?q=${parsedTitle}&searchIn=title&apiKey=${API_KEY}`
    )

    if (!res.articles.length) {
      return {
        statusCode: 404,
        results: []
      }
    }

    const article = res.articles.filter((a) => a.url !== 'https://removed.com')[0]

    const baseUrl = article.url.split('/')[2]

    console.info('baseUrl', baseUrl)
    console.info(
      'article',
      baseUrl === 'slashdot.org' ? article.description : article.description + '\n\n' + article.content
    )

    return {
      statusCode: 200,
      results: [baseUrl === 'slashdot.org' ? article.description : article.description + '\n\n' + article.content]
    }
  } catch (error) {
    console.error('Error:', error)
    return createError(error as Error)
  }
})
