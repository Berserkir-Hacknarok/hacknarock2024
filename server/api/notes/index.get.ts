// pobieranie noteów
import { createKysely } from '@vercel/postgres-kysely'

import type { Database } from '~/models'

export default defineEventHandler(async () => {
  const db = createKysely<Database>()

  const retrievedItems = await db.selectFrom('notes').select(['note_id as value', 'note as name', 'note']).execute()

  return {
    statusCode: 200,
    results: retrievedItems
  }
})
