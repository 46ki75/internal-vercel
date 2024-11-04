import { ElmJsonRendererProps } from '@elmethis/core'
import { Client } from '@elmethis/notion-node'
import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  const NOTION_API_KEY = process.env.NOTION_API_KEY

  if (NOTION_API_KEY == null) {
    setResponseStatus(event, 500)
    return { error: 'Notion API key is not set' }
  }

  const id = getRouterParam(event, 'id')

  if (id == null) {
    setResponseStatus(event, 500)
    return { error: 'Notion page ID is not set' }
  }

  const client = new Client({ auth: NOTION_API_KEY })

  const { components }: { components: ElmJsonRendererProps['json'] } =
    await client.convert({ id: id })

  const front: ElmJsonRendererProps['json'] = []
  const back: ElmJsonRendererProps['json'] = []
  const explanation: ElmJsonRendererProps['json'] = []

  let marker: 'front' | 'back' | 'explanation' = 'front'

  for (const component of components) {
    if (
      component.type === 'ElmHeading1' &&
      component.props?.text?.toLocaleLowerCase() === 'front'
    ) {
      marker = 'front'
      continue
    } else if (
      component.type === 'ElmHeading1' &&
      component.props?.text?.toLocaleLowerCase() === 'back'
    ) {
      marker = 'back'
      continue
    } else if (
      component.type === 'ElmHeading1' &&
      component.props?.text?.toLocaleLowerCase() === 'explanation'
    ) {
      marker = 'explanation'
      continue
    }

    if (marker === 'front') {
      front.push(component)
    } else if (marker === 'back') {
      back.push(component)
    } else if (marker === 'explanation') {
      explanation.push(component)
    }
  }

  return { front, back, explanation }
})
