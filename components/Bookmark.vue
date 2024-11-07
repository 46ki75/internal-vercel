<template>
  <div class="wrapper">
    <div>
      <ElmHeading1 text="Bookmarks" />
      <v-text-field
        v-model="name"
        :loading="bookmarkStore.isCreateLoading"
        label="Name"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="url"
        :loading="bookmarkStore.isCreateLoading"
        label="URL"
        variant="outlined"
      ></v-text-field>
      <ElmButton
        block
        :loading="bookmarkStore.isCreateLoading"
        @click="handleCreateBookmark"
      >
        <BookmarkIcon :style="{ width: 16 }" />
        Create New Bookmark
      </ElmButton>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '~/stores/bookmarkStore'
import {
  ElmBlockFallback,
  ElmBookmarkIcon,
  ElmButton,
  ElmHeading1,
  ElmTag
} from '@elmethis/core'
import { BookmarkIcon } from '@heroicons/vue/24/outline'

const bookmarkStore = useBookmarkStore()

const name = ref('')
const url = ref('')

const handleCreateBookmark = async () => {
  const result = await bookmarkStore.createBookmark({
    name: name.value,
    url: url.value
  })

  if (result != null && window != null) {
    name.value = ''
    url.value = ''
    window.open(result.url, '_blank')
  }
}

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
