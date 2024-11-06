<template>
  <v-textarea label="Japanese" v-model="text"></v-textarea>
  <v-btn
    :loading="translateStore.isLoading"
    block
    @click="translateStore.fetchTranslate"
  >
    TRANSLATE
  </v-btn>

  <ElmCodeBlock
    v-if="translateStore.result"
    :code="translateStore.result.text"
    :style="{ marginBlock: '2rem' }"
  />
</template>

<script setup lang="ts">
import { ElmCodeBlock } from '@elmethis/core'

import { useTranslateStore } from '~/stores/translateStore'

const translateStore = useTranslateStore()

const text = ref('')

watch(text, translateStore.setText)
onMounted(() => {
  if (translateStore.text) text.value = translateStore.text
})
</script>

<style scoped lang="scss"></style>
