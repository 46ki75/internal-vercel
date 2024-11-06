<template>
  <div class="button-container">
    <template v-if="!ankiStore.isUpdateLoading">
      <!-- <v-btn
        color="rgb(233,233,233)"
        @click="ankiStore.updateAnkiCard(0)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: black">FORGETFUL</span>
      </v-btn>

      <v-btn
        color="rgb(233,233,233)"
        @click="ankiStore.updateAnkiCard(1)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: black">INCORRECT</span>
      </v-btn>

      <v-btn
        color="rgb(233,233,233)"
        @click="ankiStore.updateAnkiCard(2)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: black">ALMOST</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(3)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: white">LUCKY GUESS</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(4)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: white">CORRECT</span>
      </v-btn>

      <v-btn
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(5)"
        :loading="ankiStore.isUpdateLoading"
      >
        <span style="color: white">CONFIDENT</span>
      </v-btn> -->

      <ElmButton
        @click="ankiStore.updateAnkiCard(0)"
        :loading="ankiStore.isUpdateLoading"
        >FORGETFUL
      </ElmButton>

      <ElmButton
        color="rgb(233,233,233)"
        @click="ankiStore.updateAnkiCard(1)"
        :loading="ankiStore.isUpdateLoading"
      >
        INCORRECT
      </ElmButton>

      <ElmButton
        color="rgb(233,233,233)"
        @click="ankiStore.updateAnkiCard(2)"
        :loading="ankiStore.isUpdateLoading"
      >
        ALMOST
      </ElmButton>

      <ElmButton
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(3)"
        :loading="ankiStore.isUpdateLoading"
      >
        LUCKY
      </ElmButton>

      <ElmButton
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(4)"
        :loading="ankiStore.isUpdateLoading"
        >CORRECT
      </ElmButton>

      <ElmButton
        color="rgb(33,33,33)"
        @click="ankiStore.updateAnkiCard(5)"
        :loading="ankiStore.isUpdateLoading"
        >CONFIDENT
      </ElmButton>
    </template>

    <div v-else class="fallback">
      <ElmDotLoadingIcon />
    </div>
  </div>

  <div class="margin"></div>
</template>

<script setup lang="ts">
import { useAnkiStore } from '~/stores/ankiStore'
import { ElmButton, ElmDotLoadingIcon } from '@elmethis/core'

const ankiStore = useAnkiStore()
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

.margin {
  height: 20rem;
  width: 100%;
}
</style>
