import type { IArticleSource } from '.'

export default interface IArticleHeadline {
  source: IArticleSource
  author: string
  title: string
  url: string
  publishedAt: string
}
