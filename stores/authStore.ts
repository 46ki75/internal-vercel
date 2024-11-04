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
    async login(password: string) {
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
        const router = useRouter()
        router.push('/')
      } catch (error) {
        this.isLoginError = true
        console.error(error)
      } finally {
        this.isLoginLoading = false
      }
    },
    async logout() {
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        const router = useRouter()
        router.push('/login')
      } catch {
        console.error('An error occured while logging out.')
      }
    },
    async checkSession() {
      this.isCheckSessionLoading = true

      this.isCheckSessionError = false
      try {
        const response = await fetch('/api/auth/session')
        if (!response.ok) {
          throw new Error('You are not logged in.')
        }
      } catch (error) {
        this.isCheckSessionError = true
        const router = useRouter()
        router.push('/login')
      } finally {
        this.isCheckSessionLoading = false
      }
    }
  }
})
