import { defineStore } from 'pinia'
import { uniqBy } from 'lodash-es'

interface BookmarkState {
  isLoading: boolean
  isError: boolean
  bookmarks: Bookmark[]
}

interface Bookmark {
  name: string
  url: string
  tags: BookmarkTag[]
  favicon?: string
}

interface BookmarkTag {
  id: string
  name: string
  color: string
}

export const useBookmarkStore = defineStore('bookmark', {
  state: (): BookmarkState => ({
    isLoading: false,
    isError: false,
    bookmarks: []
  }),
  actions: {
    async fetchBookmarks(): Promise<void> {
      this.isLoading = true
      try {
        const response = await $fetch<Bookmark[]>('/api/bookmark')
        this.bookmarks = response
      } catch {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    }
  },
  getters: {
    getBookmarkTags(): BookmarkTag[] {
      return uniqBy(
        this.bookmarks.map((bookmark) => bookmark.tags).flat(),
        'id'
      )
    }
  }
})
