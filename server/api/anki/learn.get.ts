import { Client } from '@notionhq/client'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

interface Learn {
  id: string
  nextReviewAt: string
  tags: Array<{ id: string; name: string; color: string }>
  repetitionCount: string
  easeFactor: string
  createdAt: string
  updatedAt: string
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

    const learn = await client.databases.query({
      database_id,
      page_size: 100,
      sorts: [{ property: 'nextReviewAt', direction: 'ascending' }]
    })

    const results = learn.results.map((result) => {
      if (!('properties' in result)) {
        throw new Error('Notion response does not have properties')
      }

      if (!('date' in result.properties.nextReviewAt)) {
        throw new Error('Notion response does not have nextReviewAt date')
      }

      if (result.properties.nextReviewAt.date == null) {
        throw new Error('Notion response does not have nextReviewAt date')
      }

      if (result.properties.tags.type !== 'multi_select') {
        throw new Error('Notion response does not have tags')
      }

      if (result.properties.repetitionCount.type !== 'number') {
        throw new Error('Notion response does not have repetitionCount')
      }

      if (result.properties.easeFactor.type !== 'number') {
        throw new Error('Notion response does not have easeFactor')
      }

      if (!('created_time' in result)) {
        throw new Error('Notion response does not have created_time')
      }

      if (!('last_edited_time' in result)) {
        throw new Error('Notion response does not have last_edited_time')
      }

      return {
        id: result.id,
        nextReviewAt: result.properties.nextReviewAt.date.start,
        tags: result.properties.tags.multi_select,
        repetitionCount: result.properties.repetitionCount.number,
        easeFactor: result.properties.easeFactor.number,
        createdAt: result.created_time,
        updatedAt: result.last_edited_time
      }
    })

    setResponseStatus(event, 200)
    return results
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
