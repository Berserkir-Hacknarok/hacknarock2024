import type { IArticleHeadline } from '.'

export default interface IArticle extends IArticleHeadline {
  description: string
  urlToImage: string
  content: string
}
