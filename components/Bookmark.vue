<template>
  <div class="wrapper">
    <BookmarkList />

    <BookmarkCreate />

    <div :style="{ height: '20rem' }"></div>
  </div>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '~/stores/bookmarkStore'

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
