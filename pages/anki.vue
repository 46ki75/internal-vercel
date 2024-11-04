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

          <div class="button-container">
            <v-btn color="rgb(233,233,233)">
              <span style="color: black">FORGETFUL</span>
            </v-btn>
            <v-btn color="rgb(233,233,233)">
              <span style="color: black">INCORRECT</span>
            </v-btn>
            <v-btn color="rgb(233,233,233)">
              <span style="color: black">ALMOST</span>
            </v-btn>
            <v-btn color="rgb(33,33,33)">
              <span style="color: white">LUCKY GUESS</span>
            </v-btn>
            <v-btn color="rgb(33,33,33)">
              <span style="color: white">CORRECT</span>
            </v-btn>
            <v-btn color="rgb(33,33,33)">
              <span style="color: white">CONFIDENT</span>
            </v-btn>
          </div>
        </template>
        <v-btn v-if="!isShowAnswer" @click="isShowAnswer = true"
          >SHOW ANSWER</v-btn
        >
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
  margin-block: 1.5rem;
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
