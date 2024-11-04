import { verify } from 'argon2'
import { SignJWT, jwtVerify } from 'jose'
import 'dotenv/config'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  try {
    const hash = process.env.PASSWORD

    if (hash == null) {
      setResponseStatus(event, 500)
      return { error: 'Hashed password is not set' }
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY

    if (jwtSecretKey == null) {
      setResponseStatus(event, 500)
      return { error: 'JWT secret key is not set' }
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
    } else {
      const payload = {}

      const secret = new TextEncoder().encode(jwtSecretKey)

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret)

      setCookie(event, 'jwt_session_token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development'
      })

      return { token }
    }
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
