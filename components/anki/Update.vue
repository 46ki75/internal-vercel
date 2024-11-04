<template>
  <div class="button-container">
    <template v-if="!isLoading">
      <v-btn
        color="rgb(233,233,233)"
        @click="updateAnkiCard({ ...props, performanceRating: 0 })"
        :loading="isLoading"
      >
        <span style="color: black">FORGETFUL</span>
      </v-btn>

      <v-btn
        color="rgb(233,233,233)"
        @click="updateAnkiCard({ ...props, performanceRating: 1 })"
        :loading="isLoading"
      >
        <span style="color: black">INCORRECT</span>
      </v-btn>

      <v-btn
        color="rgb(233,233,233)"
        @click="updateAnkiCard({ ...props, performanceRating: 2 })"
        :loading="isLoading"
      >
        <span style="color: black">ALMOST</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="updateAnkiCard({ ...props, performanceRating: 3 })"
        :loading="isLoading"
      >
        <span style="color: white">LUCKY GUESS</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="updateAnkiCard({ ...props, performanceRating: 4 })"
        :loading="isLoading"
      >
        <span style="color: white">CORRECT</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="updateAnkiCard({ ...props, performanceRating: 5 })"
        :loading="isLoading"
      >
        <span style="color: white">CONFIDENT</span>
      </v-btn>
    </template>

    <div v-else class="fallback">
      <ElmDotLoadingIcon v-if="isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface updateAnkiCardProps {
  repetitionCount: number
  easeFactor: number
  nextReviewAt: string
  id: string
}

const props = defineProps<updateAnkiCardProps>()

const isLoading = defineModel<boolean>({
  default: false
})

async function updateAnkiCard(
  card: updateAnkiCardProps & {
    performanceRating: 0 | 1 | 2 | 3 | 4 | 5
  }
) {
  const maxInterval = 365 / 4
  const minInterval = 0.5

  isLoading.value = true

  if (card.performanceRating < 3) {
    card.easeFactor = Math.max(1.3, card.easeFactor * 0.85)
    card.repetitionCount = 0
  } else {
    card.easeFactor +=
      0.1 -
      (5 - card.performanceRating) *
        (0.08 + (5 - card.performanceRating) * 0.02)
    card.repetitionCount += 1
  }

  let newInterval
  if (card.performanceRating === 0) {
    newInterval = minInterval
  } else if (card.performanceRating === 1) {
    newInterval = minInterval
  } else if (card.performanceRating === 2) {
    newInterval = Math.max(minInterval, card.repetitionCount)
  } else {
    let multiplier = 1
    if (card.performanceRating === 3) {
      multiplier = 1
    } else if (card.performanceRating === 4) {
      multiplier = 1.5
    } else if (card.performanceRating === 5) {
      multiplier = 2
    }
    newInterval = Math.min(
      maxInterval,
      Math.pow(card.easeFactor, card.repetitionCount) * multiplier
    )
  }

  card.nextReviewAt = new Date(
    Date.now() + newInterval * 24 * 60 * 60 * 1000
  ).toISOString()

  await $fetch('/api/anki/learn', {
    method: 'patch',
    body: {
      id: card.id,
      nextReviewAt: card.nextReviewAt,
      repetitionCount: card.repetitionCount,
      easeFactor: card.easeFactor
    }
  })

  isLoading.value = false
}
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.fallback {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
}
</style>
