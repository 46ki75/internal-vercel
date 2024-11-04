import { validateJwtWithEvent } from '~/server/validateJwt'

export default defineEventHandler(async (event) => {
  const { body } = await validateJwtWithEvent(event)
  return body
})
