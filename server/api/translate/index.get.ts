import { validateJwtWithEvent } from '~/server/validateJwtWithEvent'
import * as deepl from 'deepl-node'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  const { body, isValid } = await validateJwtWithEvent(event)
  if (!isValid) return body

  try {
    const DEEPL_API_KEY = process.env.DEEPL_API_KEY

    if (DEEPL_API_KEY == null) {
      setResponseStatus(event, 500)
      return { error: 'DeepL API key is not set' }
    }

    const translator = new deepl.Translator(DEEPL_API_KEY)

    const { character } = await translator.getUsage()

    return character
  } catch (e) {
    console.error(e)
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
