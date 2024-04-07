// tworzenie noteów
import { createKysely } from '@vercel/postgres-kysely'

import type { Database } from '~/models'

interface INotePayload {
  note: string
  id?: number
}

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()
  const { note, id } = await readBody<INotePayload>(event)

  if (!note) {
    return createError({
      statusCode: 400,
      message: 'Note is required'
    })
  }

  let result

  if (id && id > -1) {
    result = await db
      .updateTable('notes')
      .set({
        note
      })
      .where('note_id', '=', id)
      .returning(['note_id'])
      .executeTakeFirst()
  } else {
    result = await db
      .insertInto('notes')
      .values({
        note
      })
      .returning(['note_id'])
      .executeTakeFirst()
  }

  return {
    statusCode: 200,
    results: [result]
  }
})
