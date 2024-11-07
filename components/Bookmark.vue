<template>
  <div class="wrapper">
    <ElmBlockFallback
      v-if="bookmarkStore.bookmarks.length == 0 && bookmarkStore.isFetchLoading"
    />

    <div v-else class="bookmark-vartical-container">
      <div v-for="tag in bookmarkStore.getBookmarkTags">
        <ElmTag :text="tag.name" />
        <div class="bookmark-horizontal-container">
          <template v-for="bookmark in bookmarkStore.bookmarks">
            <ElmBookmarkIcon
              v-if="bookmark.tags.some((t) => t.id === tag.id)"
              :href="bookmark.url"
              :name="bookmark.name"
              :favicon="bookmark.favicon"
            />
          </template>
        </div>
      </div>
    </div>

    <BookmarkCreate />

    <div :style="{ height: '20rem' }"></div>
  </div>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '~/stores/bookmarkStore'
import { ElmBlockFallback, ElmBookmarkIcon, ElmTag } from '@elmethis/core'

const bookmarkStore = useBookmarkStore()

onMounted(bookmarkStore.fetchBookmarks)
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 100%;
  width: 800px;
}

.bookmark-vartical-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1.5rem;
  margin-block: 1.5rem;
}

.bookmark-horizontal-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
