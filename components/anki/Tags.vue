<template>
  <div class="tag-container">
    <ElmTag v-for="tag in tags" :text="tag.text" />
  </div>
</template>

<script setup lang="ts">
import { ElmTag, type ElmTagProps } from '@elmethis/core'

defineProps<{
  tags: ElmTagProps[]
}>()
</script>

<style scoped lang="scss">
.vertical-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
