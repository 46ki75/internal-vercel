import { defineStore } from 'pinia'
import { uniqBy } from 'lodash-es'

interface BookmarkState {
  isFetchLoading: boolean
  isFetchError: boolean
  bookmarks: Bookmark[]
  isCreateLoading: boolean
  isCreateError: boolean
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
    isFetchLoading: false,
    isFetchError: false,
    bookmarks: [],
    isCreateLoading: false,
    isCreateError: false
  }),
  actions: {
    async fetchBookmarks(): Promise<void> {
      this.isFetchLoading = true
      try {
        const response = await $fetch<Bookmark[]>('/api/bookmark')
        this.bookmarks = response
      } catch {
        this.isFetchError = true
      } finally {
        this.isFetchLoading = false
      }
    },
    async createBookmark({
      name,
      url
    }: {
      name: string
      url: string
    }): Promise<{ url: string } | null> {
      this.isCreateLoading = true
      try {
        const response = await $fetch<{ url: string }>('/api/bookmark', {
          method: 'POST',
          body: { name, url }
        })
        return { url: response.url }
      } catch {
        this.isCreateError = true
        return null
      } finally {
        this.isCreateLoading = false
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
