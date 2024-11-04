import { jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  const token = getCookie(event, 'jwt_session_token')

  if (token == null) {
    setResponseStatus(event, 401)
    return { error: 'cookie not found' }
  }

  const jwtSecretkey = process.env.JWT_SECRET_KEY

  if (jwtSecretkey == null) {
    setResponseStatus(event, 500)
    return { error: 'JWT secret key is not set' }
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

  try {
    const _ = await jwtVerify(token, secret)
  } catch {
    setResponseStatus(event, 401)
    return { error: 'Invalid token' }
  }

  setResponseStatus(event, 200)
  return { message: 'Session is valid' }
})
