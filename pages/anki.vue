<template>
  <div class="container">
    <div class="vertical-container">
      <ElmToggle summary="Translate Tools" :style="{ marginBlock: '1rem' }">
        <Translate />
      </ElmToggle>

      <AnkiInfo />

      <template v-if="ankiStore.block != null">
        <div class="card">
          <ElmInlineText text="front" bold size="1.25rem" />
          <ElmJsonRenderer :json="ankiStore.block.front" />
        </div>
        <template v-if="ankiStore.isShowAnswer">
          <ElmDivider />

          <div class="card">
            <ElmInlineText text="back" bold size="1.25rem" />
            <ElmJsonRenderer :json="ankiStore.block.back" />
          </div>

          <ElmDivider />

          <div class="card">
            <ElmInlineText text="explanation" bold size="1.25rem" />
            <ElmJsonRenderer :json="ankiStore.block.explanation" />
          </div>

          <AnkiUpdate />
        </template>

        <ElmButton
          v-if="!ankiStore.isShowAnswer"
          @click="ankiStore.setIsShowAnswer(true)"
        >
          SHOW ANSWER
        </ElmButton>
      </template>

      <template v-else>
        <ElmBlockFallback />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElmToggle,
  ElmDivider,
  ElmInlineText,
  ElmJsonRenderer,
  ElmBlockFallback,
  ElmButton
} from '@elmethis/core'

import { useAnkiStore } from '~/stores/ankiStore'

const ankiStore = useAnkiStore()

onMounted(ankiStore.fetchLearn)
watch(() => ankiStore.isUpdateLoading, ankiStore.next)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vertical-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tag-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
}

.card {
  margin-block: 1.5rem;
}
</style>
