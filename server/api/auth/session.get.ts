import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'

export default defineEventHandler(async (event) => {
  const { body } = await validateJwtWithEvent(event)
  return body
})
