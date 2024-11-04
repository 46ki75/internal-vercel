import { verify } from 'argon2'
import 'dotenv/config'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  try {
    const hash = process.env.PASSWORD

    if (hash == null) {
      setResponseStatus(event, 500)
      return { error: 'Hashed password is not set' }
    }

    const isValidBody = await readValidatedBody(event, (body) => {
      return typeof body === 'object' && body !== null
    })

    if (!isValidBody) {
      setResponseStatus(event, 400)
      return { error: 'Invalid body' }
    }

    const body = await readBody(event)

    const { password } = body

    if (password == null) {
      setResponseStatus(event, 400)
      return { error: '`password` is required' }
    }

    const isValid = await verify(hash, password)

    if (!isValid) {
      setResponseStatus(event, 401)
      return { error: 'Invalid password' }
    }

    return { message: 'Success' }
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
