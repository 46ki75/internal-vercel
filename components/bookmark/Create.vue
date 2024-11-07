<template>
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
</template>

<script setup lang="ts">
import { useBookmarkStore } from '~/stores/bookmarkStore'
import { ElmButton, ElmHeading1 } from '@elmethis/core'
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
</script>

<style scoped></style>
