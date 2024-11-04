import { Client } from '@notionhq/client'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

export default defineEventHandler(async (event) => {
  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  const id = getRouterParam(event, 'id')

  if (id == null) {
    setResponseStatus(event, 500)
    return { error: 'Notion page ID is not set' }
  }

  const { nextReviewAt, easeFactor, repetitionCount } = await readBody(event)

  if (nextReviewAt == null) {
    setResponseStatus(event, 400)
    return { error: 'nextReviewAt is required' }
  }

  if (easeFactor == null) {
    setResponseStatus(event, 400)
    return { error: 'easeFactor is required' }
  }

  if (repetitionCount == null) {
    setResponseStatus(event, 400)
    return { error: 'repetitionCount is required' }
  }

  try {
    const NOTION_API_KEY = process.env.NOTION_API_KEY

    if (NOTION_API_KEY == null) {
      setResponseStatus(event, 500)
      return { error: 'Notion API key is not set' }
    }

    const client = new Client({ auth: NOTION_API_KEY })

    const data = await client.pages.update({
      page_id: id,
      properties: {
        nextReviewAt: {
          type: 'date',
          date: { start: nextReviewAt }
        },
        easeFactor: {
          type: 'number',
          number: parseFloat(easeFactor)
        },
        repetitionCount: {
          type: 'number',
          number: parseFloat(repetitionCount)
        }
      }
    })

    setResponseStatus(event, 200)
    return data
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
