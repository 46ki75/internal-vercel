import { defineStore } from 'pinia'

interface TranslateState {
  isLoading: boolean
  isError: boolean
  text?: string
  result?: Translate
  count?: number
  limit?: number
}

type Languages = 'ja' | 'en-US'

interface Translate {
  text: string
  detectedSourceLang: Languages
  billedCharacters: number
}

export const useTranslateStore = defineStore('translate', {
  state: (): TranslateState => ({
    isLoading: false,
    isError: false,
    text: undefined,
    result: undefined,
    count: undefined,
    limit: undefined
  }),
  actions: {
    async fetchTranslate(): Promise<void> {
      if (this.text == null) return

      this.isLoading = true
      this.isError = false
      try {
        const response = await $fetch<Translate>('/api/translate', {
          method: 'POST',
          body: {
            text: this.text,
            sourceLanguage: 'ja',
            targetLanguage: 'en-US'
          }
        })
        this.result = response
        this.fetchUsage()
      } catch {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async fetchUsage(): Promise<void> {
      const result = await $fetch<{
        count: number
        limit: number
      }>('/api/translate')

      console.log(result)

      this.count = result.count
      this.limit = result.limit
    },
    setText(text: string) {
      this.text = text
    }
  }
})
