import { Client } from '@notionhq/client'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

interface Learn {
  id: string
  nextReviewAt: string
  tags: Array<{ id: string; name: string; color: string }>
  repetitionCount: number
  easeFactor: number
  createdAt: string
  updatedAt: string
  url: string
}

export default defineEventHandler(async (event) => {
  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  try {
    const NOTION_API_KEY = process.env.NOTION_API_KEY
    const database_id = process.env.NOTION_ANKI_DATABASE_ID

    if (NOTION_API_KEY == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion API key is not set' }
    }

    if (database_id == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion database ID is not set' }
    }

    const client = new Client({ auth: NOTION_API_KEY })

    const response = await client.pages.create({
      parent: { type: 'database_id', database_id: database_id },
      properties: {
        easeFactor: { type: 'number', number: 2.5 },
        repetitionCount: { type: 'number', number: 0 },
        nextReviewAt: {
          type: 'date',
          date: { start: new Date().toISOString(), end: null, time_zone: null }
        }
      },
      children: [
        {
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: { content: 'front' },
                annotations: { color: 'brown' }
              }
            ]
          }
        },
        { paragraph: { rich_text: [] } },
        {
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: { content: 'back' },
                annotations: { color: 'brown' }
              }
            ]
          }
        },
        { paragraph: { rich_text: [] } },
        {
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: { content: 'explanation' },
                annotations: { color: 'brown' }
              }
            ]
          }
        },
        { paragraph: { rich_text: [] } }
      ]
    })

    if ('url' in response) {
      setResponseStatus(event, 200)
      return { url: response.url }
    } else {
      setResponseStatus(event, 500)
      return { error: 'Notion response does not have url' }
    }
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
