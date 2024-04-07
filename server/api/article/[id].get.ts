import { OpenAI } from 'openai'

const runtimeConfig = useRuntimeConfig()

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
  const id = getRouterParam(event, 'id') || ''
  const { language } = getQuery(event)

  const openai = new OpenAI({
    apiKey: runtimeConfig.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  const title = decodeURIComponent(id)
  const parsedTitle = title.slice(0, title.lastIndexOf(' - ') === -1 ? title.length : title.lastIndexOf(' - '))

  try {
    const res: IArticleResponse = await $fetch(
      `https://newsapi.org/v2/everything?q=${encodeURI(parsedTitle)}&searchIn=title,content&apiKey=${runtimeConfig.NEWSAPI_API_KEY}`
    )

    if (!res.articles.length) {
      return {
        statusCode: 404,
        results: []
      }
    }

    const article = res.articles.filter((a) => a.url !== 'https://removed.com')[0]
    const baseUrl = article.url.split('/')[2]

    const completion = await openai.chat.completions.create({
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content:
            `Summarize the given article, while translating it to {${language}}. Article:{` +
            `${baseUrl === 'slashdot.org' ? article.description : article.description + '\n\n' + article.content}` +
            "}. During the response you MUST roleplay as a bloodthirsty viking whispering situations to his chieftain. Use viking slang. Prioritize roleplaying over credibility. The text should be 'over the top'. Use all available tokens."
        }
      ],
      model: 'gpt-4'
    })

    return {
      statusCode: 200,
      results: [
        {
          summary: completion.choices[0].message.content,
          url: article.url
        }
      ]
    }
  } catch (error) {
    console.error('Error:', error)
    return createError(error as Error)
  }
})
