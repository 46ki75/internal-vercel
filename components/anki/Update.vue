<template>
  <template v-if="!ankiStore.isUpdateLoading">
    <div class="button-container">
      <ElmButton
        block
        @click="ankiStore.updateAnkiCard(0)"
        :loading="ankiStore.isUpdateLoading"
      >
        <XMarkIcon :style="{ width: 16 }" />
        <span>FORGETFUL</span>
      </ElmButton>

      <ElmButton
        block
        @click="ankiStore.updateAnkiCard(1)"
        :loading="ankiStore.isUpdateLoading"
      >
        <XMarkIcon :style="{ width: 16 }" />
        <span>INCORRECT</span>
      </ElmButton>

      <ElmButton
        block
        @click="ankiStore.updateAnkiCard(2)"
        :loading="ankiStore.isUpdateLoading"
      >
        <XMarkIcon :style="{ width: 16 }" />
        <span>ALMOST</span>
      </ElmButton>
    </div>

    <div class="button-container">
      <ElmButton
        block
        primary
        @click="ankiStore.updateAnkiCard(3)"
        :loading="ankiStore.isUpdateLoading"
      >
        <CheckIcon :style="{ width: 16 }" />
        <span>LUCKY</span>
      </ElmButton>

      <ElmButton
        block
        primary
        @click="ankiStore.updateAnkiCard(4)"
        :loading="ankiStore.isUpdateLoading"
      >
        <CheckIcon :style="{ width: 16 }" />
        <span>CORRECT</span>
      </ElmButton>

      <ElmButton
        block
        primary
        @click="ankiStore.updateAnkiCard(5)"
        :loading="ankiStore.isUpdateLoading"
      >
        <CheckIcon :style="{ width: 16 }" />
        <span>CONFIDENT</span>
      </ElmButton>
    </div>
  </template>

  <div v-else class="fallback">
    <ElmDotLoadingIcon />
  </div>

  <div class="margin"></div>
</template>

<script setup lang="ts">
import { useAnkiStore } from '~/stores/ankiStore'
import { ElmButton, ElmDotLoadingIcon } from '@elmethis/core'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const ankiStore = useAnkiStore()
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.fallback {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
}

.margin {
  height: 20rem;
  width: 100%;
}
</style>
