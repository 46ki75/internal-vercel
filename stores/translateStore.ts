import { defineStore } from 'pinia'

interface TranslateState {
  isLoading: boolean
  isError: boolean
  text?: string
  result?: Translate
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
    result: undefined
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
      } catch {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    setText(text: string) {
      this.text = text
    }
  }
})
