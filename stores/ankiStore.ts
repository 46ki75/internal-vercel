import { defineStore } from 'pinia'
import type { ElmJsonRendererProps } from '@elmethis/core'

interface Learn {
  id: string
  nextReviewAt: string
  tags: Array<{ id: string; name: string; color: string }>
  repetitionCount: number
  easeFactor: number
  createdAt: string
  updatedAt: string
  url: string
}

interface AnkiState {
  learnList: Learn[]
  currentLearn: Learn | null
  block: {
    front: ElmJsonRendererProps['json']
    back: ElmJsonRendererProps['json']
    explanation: ElmJsonRendererProps['json']
  } | null
  isBlockLoading: boolean
  isUpdateLoading: boolean
  isCreateLoading: boolean
  isShowAnswer: boolean
}

export const useAnkiStore = defineStore('anki', {
  state: (): AnkiState => ({
    learnList: [],
    currentLearn: null,
    block: null,
    isBlockLoading: false,
    isUpdateLoading: false,
    isCreateLoading: false,
    isShowAnswer: false
  }),
  actions: {
    async fetchLearn() {
      const response = await fetch('/api/anki/learn')
      const data: Learn[] = await response.json()
      this.learnList = data
      await this.next()
    },
    async next() {
      if (this.currentLearn == null) {
        this.currentLearn = this.learnList.shift() ?? null
        this.learnList = [...this.learnList]
        if (this.currentLearn != null) {
          await this.fetchBlock(this.currentLearn.id)
        } else {
          await this.fetchLearn()
          await this.next()
        }
      }
    },
    async fetchBlock(id: string) {
      this.isBlockLoading = true
      const response = await fetch(`/api/anki/block/${id}`)
      this.block = await response.json()
      this.isBlockLoading = false
    },
    async updateAnkiCard(performanceRating: 0 | 1 | 2 | 3 | 4 | 5) {
      if (this.currentLearn == null) {
        throw new Error('No current learn')
      } else {
        const maxInterval = 365 / 4
        const minInterval = 0.5

        this.isUpdateLoading = true

        if (performanceRating < 3) {
          this.currentLearn.easeFactor = Math.max(
            1.3,
            this.currentLearn.easeFactor * 0.85
          )
          this.currentLearn.repetitionCount = 0
        } else {
          this.currentLearn.easeFactor +=
            0.1 -
            (5 - performanceRating) * (0.08 + (5 - performanceRating) * 0.02)
          this.currentLearn.repetitionCount += 1
        }

        let newInterval
        if (performanceRating === 0) {
          newInterval = minInterval
        } else if (performanceRating === 1) {
          newInterval = minInterval
        } else if (performanceRating === 2) {
          newInterval = Math.max(minInterval, this.currentLearn.repetitionCount)
        } else {
          let multiplier = 1
          if (performanceRating === 3) {
            multiplier = 1
          } else if (performanceRating === 4) {
            multiplier = 1.5
          } else if (performanceRating === 5) {
            multiplier = 2
          }
          newInterval = Math.min(
            maxInterval,
            Math.pow(
              this.currentLearn.easeFactor,
              this.currentLearn.repetitionCount
            ) * multiplier
          )
        }

        this.currentLearn.nextReviewAt = new Date(
          Date.now() + newInterval * 24 * 60 * 60 * 1000
        ).toISOString()

        await $fetch('/api/anki/learn', {
          method: 'patch',
          body: {
            id: this.currentLearn.id,
            nextReviewAt: this.currentLearn.nextReviewAt,
            repetitionCount: this.currentLearn.repetitionCount,
            easeFactor: this.currentLearn.easeFactor
          }
        })

        this.currentLearn = null
        this.isShowAnswer = false
        this.isUpdateLoading = false
        this.next()
      }
    },
    setIsShowAnswer(isShowAnswer: boolean) {
      this.isShowAnswer = isShowAnswer
    },
    async createNewAnkiCard() {
      this.isCreateLoading = true
      const data = await $fetch<{ url: string }>('/api/anki/', {
        method: 'post'
      })
      this.isCreateLoading = false
      return { url: data.url }
    }
  },
  getters: {
    remainCount(state) {
      if (state.currentLearn != null) {
        const now = new Date()
        const nextReviewAt = state.learnList.map(
          (learn) => new Date(learn.nextReviewAt)
        )
        return (
          nextReviewAt.filter((date) => date < now).length +
          (new Date(state.currentLearn.nextReviewAt) < now ? 1 : 0)
        )
      }
    }
  }
})
