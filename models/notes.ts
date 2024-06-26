import type { Insertable, Selectable, Updateable, Generated } from 'kysely'

export default interface Notes {
  note_id: Generated<number>
  note: string
}

export type NotesRow = Selectable<Notes>
export type InsertableNotesRow = Insertable<Notes>
export type UpdateableNotesRow = Updateable<Notes>
