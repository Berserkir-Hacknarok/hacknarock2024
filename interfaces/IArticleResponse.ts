import type { IArticle } from '.'

export default interface IArticleResponse {
  status: string
  totalResults: number
  articles: IArticle[]
}
