import { defineStore } from '#imports'

interface AuthState {
  isLoginLoading: boolean
  isLoginError: boolean
  isCheckSessionLoading: boolean
  isCheckSessionError: boolean
  isLogoutLoading: boolean
  isInSession: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoginLoading: false,
    isLoginError: false,
    isCheckSessionLoading: false,
    isCheckSessionError: false,
    isLogoutLoading: false,
    isInSession: false
  }),
  actions: {
    async login(password: string): Promise<boolean> {
      this.isLoginLoading = true
      this.isLoginError = false
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        })
        if (!response.ok) {
          throw new Error('An error occured.')
        }
        return true
      } catch (error) {
        this.isLoginError = true
        console.error(error)
        return false
      } finally {
        this.isLoginLoading = false
      }
    },
    async logout(): Promise<boolean> {
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        return true
      } catch {
        console.error('An error occured while logging out.')
        return false
      }
    },
    async checkSession(): Promise<boolean> {
      this.isCheckSessionLoading = true

      this.isCheckSessionError = false
      try {
        const response = await fetch('/api/auth/session')
        if (!response.ok) {
          throw new Error('You are not logged in.')
        }
        return true
      } catch (error) {
        this.isCheckSessionError = true
        return false
      } finally {
        this.isCheckSessionLoading = false
      }
    }
  }
})
