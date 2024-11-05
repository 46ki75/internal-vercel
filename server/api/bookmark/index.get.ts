import { Client } from '@notionhq/client'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  try {
    const NOTION_API_KEY = process.env.NOTION_API_KEY
    const database_id = process.env.NOTION_WEBSITES_DATABASE_ID

    if (NOTION_API_KEY == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion API key is not set' }
    }

    if (database_id == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion database ID is not set' }
    }

    const client = new Client({ auth: NOTION_API_KEY })

    const bookmarks = await client.databases.query({
      database_id,
      page_size: 100,
      filter: { property: 'type', select: { equals: 'Bookmark' } }
    })

    return bookmarks
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
