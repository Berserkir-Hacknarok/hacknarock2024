import { createKysely } from '@vercel/postgres-kysely'
import type { Database } from '~/models'

export default defineEventHandler(async () => {
  const db = createKysely<Database>()

  const textTranslations = await db
    .selectFrom('text_translation')
    .select(['textid', 'short', 'medium', 'extended'])
    .where('languageid', '=', 1033)
    .execute()

  return {
    statusCode: 200,
    results: textTranslations,
  }
})
