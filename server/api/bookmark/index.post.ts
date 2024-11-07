import { Client } from '@notionhq/client'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

export default defineEventHandler(async (event) => {
  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  try {
    const NOTION_API_KEY = process.env.NOTION_API_KEY
    const database_id = process.env.NOTION_BOOKMARK_DATABASE_ID

    if (NOTION_API_KEY == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion API key is not set' }
    }

    if (database_id == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion database ID is not set' }
    }

    const body = await readBody(event)

    const { name, url } = body

    if (name == null) {
      setResponseStatus(event, 400)
      return { error: '`name` is required' }
    }

    const client = new Client({ auth: NOTION_API_KEY })

    const domain = new URL(
      url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`
    ).hostname

    const bookmark = await client.pages.create({
      parent: { database_id },
      icon: {
        type: 'external',
        external: { url: `https://logo.clearbit.com/${domain}` }
      },
      properties: {
        name: { title: [{ text: { content: name } }] },
        url: { url }
      }
    })

    if (!('url' in bookmark)) {
      setResponseStatus(event, 500)
      throw new Error('url is not in bookmark or type of url is not url')
    }

    return { url: bookmark.url }
  } catch (e) {
    console.error(e)
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
