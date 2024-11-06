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

    const isValidBody = await readValidatedBody(event, (body) => {
      return typeof body === 'object' && body !== null
    })

    if (!isValidBody) {
      setResponseStatus(event, 400)
      return { error: 'Invalid body' }
    }

    const body = await readBody(event)

    const { text, sourceLanguage, targetLanguage } = body

    const translator = new deepl.Translator(DEEPL_API_KEY)

    if (typeof text !== 'string') {
      setResponseStatus(event, 400)
      return { error: 'Invalid Japanese text' }
    }

    if (!(sourceLanguage !== 'ja' || sourceLanguage !== 'en-US')) {
      setResponseStatus(event, 400)
      return { error: 'Invalid source language' }
    }

    if (!(sourceLanguage !== 'ja' || sourceLanguage !== 'en-US')) {
      setResponseStatus(event, 400)
      return { error: 'Invalid target language' }
    }

    const result = await translator.translateText(
      text,
      sourceLanguage,
      targetLanguage
    )

    return result
  } catch (e) {
    console.error(e)
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
