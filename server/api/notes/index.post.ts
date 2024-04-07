// tworzenie noteów
import { createKysely } from '@vercel/postgres-kysely'

import type { Database } from '~/models'

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()
  const body = await readBody(event)
  const result = await db
    .insertInto('notes')
    .values({
      note: body.note
    })
    .returning(['note_id'])
    .executeTakeFirst()

  console.info(result)

  return {
    statusCode: 200,
    results: [result]
  }
})
