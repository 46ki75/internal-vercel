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

    const results = bookmarks.results.map((page) => {
      if (!('properties' in page)) {
        setResponseStatus(event, 500)
        throw new Error('properties is not in page')
      }

      if (!('url' in page.properties)) {
        setResponseStatus(event, 500)
        throw new Error('url is not in page or type of url is not url')
      }

      if (page.properties.url.type !== 'url') {
        setResponseStatus(event, 500)
        throw new Error('url is not in page or type of url is not url')
      }

      if (!('name' in page.properties)) {
        setResponseStatus(event, 500)
        throw new Error('name is not in page')
      }

      if (page.properties.name.type !== 'title') {
        setResponseStatus(event, 500)
        throw new Error('name is not in page or type of name is not title')
      }

      if (!('tags' in page.properties)) {
        setResponseStatus(event, 500)
        throw new Error('tags is not in page')
      }

      if (page.properties.tags.type !== 'multi_select') {
        setResponseStatus(event, 500)
        throw new Error(
          'tags is not in page or type of tags is not multi_select'
        )
      }

      return {
        name: page.properties.name.title
          .map((text) => text.plain_text)
          .join(''),
        url: page.properties.url.url,
        tags: page.properties.tags.multi_select
      }
    })

    return results
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
