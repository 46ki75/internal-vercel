import { hash } from 'argon2'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json')

  try {
    setCookie(event, 'jwt_session_token', '', {
      maxAge: 0
    })

    return { message: 'Logged out' }
  } catch {
    setResponseStatus(event, 500)
    return { error: 'Internal server error' }
  }
})
