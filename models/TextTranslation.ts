import type { Insertable, Selectable, Updateable } from 'kysely'

export default interface TextTranslation {
  textid: number
  languageid: number
  short: string
  medium: string
  extended: string
}

export type TextTranslationRow = Selectable<TextTranslation>
export type InsertableTextTranslationRow = Insertable<TextTranslation>
export type UpdateableTextTranslationRow = Updateable<TextTranslation>
