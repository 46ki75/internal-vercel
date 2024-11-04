<template>
  <div class="wrapper">
    <div class="container">
      <template v-if="data != null">
        <div class="card">
          <ElmInlineText text="front" bold size="1.25rem" />
          <ElmJsonRenderer :json="data.front" />
        </div>
        <template v-if="isShowAnswer">
          <ElmDivider />
          <div class="card">
            <ElmInlineText text="back" bold size="1.25rem" />
            <ElmJsonRenderer :json="data.back" />
          </div>
          <ElmDivider />
          <div class="card">
            <ElmInlineText text="explanation" bold size="1.25rem" />
            <ElmJsonRenderer :json="data.explanation" />
          </div>
        </template>
        <v-btn @click="isShowAnswer = true">SHOW ANSWER</v-btn>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElmDivider,
  ElmInlineText,
  ElmJsonRenderer,
  type ElmJsonRendererProps
} from '@elmethis/core'

const { data, status } = useFetch<{
  front: ElmJsonRendererProps['json']
  back: ElmJsonRendererProps['json']
  explanation: ElmJsonRendererProps['json']
}>('/api/anki/block/13334608d5c981d3a307e75f2673e306')

const isShowAnswer = ref(false)
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  box-sizing: border-box;
  padding: 0.5rem;
  /* box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1); */
}
</style>
