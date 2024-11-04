import type { EventHandlerRequest, H3Event } from 'h3'
import { jwtVerify } from 'jose'

export const validateJwtWithEvent = async (
  event: H3Event<EventHandlerRequest>
): Promise<{ body: any; isValid: boolean }> => {
  try {
    setHeader(event, 'Content-Type', 'application/json')

    const token = getCookie(event, 'jwt_session_token')

    if (token == null) {
      setResponseStatus(event, 401)
      return { body: { error: 'cookie not found' }, isValid: false }
    }

    const jwtSecretkey = process.env.JWT_SECRET_KEY

    if (jwtSecretkey == null) {
      setResponseStatus(event, 500)
      return { body: { error: 'JWT secret key is not set' }, isValid: false }
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

    try {
      const _ = await jwtVerify(token, secret)
    } catch {
      setResponseStatus(event, 401)
      return { body: { error: 'Invalid token' }, isValid: false }
    }

    setResponseStatus(event, 200)
    return { body: { message: 'Session is valid' }, isValid: true }
  } catch {
    setResponseStatus(event, 500)
    return { body: { error: 'Internal server error' }, isValid: false }
  }
}
