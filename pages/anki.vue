<template>
  <div class="wrapper">
    <div class="vertical-container">
      {{ learnList.length }}

      <ElmInlineText v-if="currentLearn" :text="currentLearn?.id" />

      <AnkiInfo />

      <template v-if="currentLearn != null">
        <AnkiTags
          :tags="
            currentLearn.tags.map((tag) => ({
              text: tag.name,
              color: tag.color
            }))
          "
        />
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

          <AnkiUpdate
            v-if="currentLearn != null"
            :id="currentLearn?.id"
            :ease-factor="currentLearn?.easeFactor"
            :repetition-count="currentLearn?.repetitionCount"
            :next-review-at="currentLearn?.nextReviewAt"
            v-model="isLoadingUpdate"
          />
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
  ElmDotLoadingIcon,
  ElmInlineText,
  ElmJsonRenderer,
  type ElmJsonRendererProps
} from '@elmethis/core'

interface Learn {
  id: string
  nextReviewAt: string
  tags: Array<{ id: string; name: string; color: string }>
  repetitionCount: number
  easeFactor: number
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
  await next()
}

const next = async () => {
  currentLearn.value = learnList.value.shift() ?? null
  learnList.value = [...learnList.value]
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
const isLoadingUpdate = ref(false)

watch(() => isLoadingUpdate, next)
</script>

<style scoped lang="scss">
.wrapper {
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
