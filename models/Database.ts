import type { Notes, TextTranslation } from '.'

export default interface Database {
  text_translation: TextTranslation
  notes: Notes
}
