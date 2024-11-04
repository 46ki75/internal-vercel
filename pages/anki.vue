<template>
  <div class="wrapper">
    <div class="container">
      <AnkiInfo />

      <template v-if="currentLearn != null">
        <div>{{ currentLearn }}</div>
      </template>

      <template v-if="block != null">
        <div class="card">
          <ElmInlineText text="front" bold size="1.25rem" />
          <ElmJsonRenderer :json="block.front" />
        </div>
        <template v-if="isShowAnswer">
          <ElmDivider />

          <div class="card">
            <ElmInlineText text="back" bold size="1.25rem" />
            <ElmJsonRenderer :json="block.back" />
          </div>

          <ElmDivider />

          <div class="card">
            <ElmInlineText text="explanation" bold size="1.25rem" />
            <ElmJsonRenderer :json="block.explanation" />
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
        <v-btn v-if="!isShowAnswer" @click="isShowAnswer = true">
          SHOW ANSWER
        </v-btn>
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

interface Learn {
  id: string
  nextReviewAt: string
  tags: Array<{ id: string; name: string; color: string }>
  repetitionCount: string
  easeFactor: string
  createdAt: string
  updatedAt: string
}

const learnList = ref<Learn[]>([])
const currentLearn = ref<Learn | null>(null)
const block = ref<{
  front: ElmJsonRendererProps['json']
  back: ElmJsonRendererProps['json']
  explanation: ElmJsonRendererProps['json']
} | null>(null)

const fetchLearn = async () => {
  const response = await fetch('/api/anki/learn')
  const data: Learn[] = await response.json()
  learnList.value = data
  currentLearn.value = data.shift() ?? null
  if (currentLearn.value != null) {
    await fetchBlock(currentLearn.value.id)
  }
}

onMounted(fetchLearn)

const fetchBlock = async (id: string) => {
  const response = await fetch(`/api/anki/block/${id}`)
  block.value = await response.json()
}

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
