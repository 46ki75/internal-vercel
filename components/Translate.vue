<template>
  <ElmParagraph>
    <ElmInlineText :text="`Usage: `" bold />
    <ElmInlineText
      v-if="translateStore.count && translateStore.limit"
      :text="`${Math.floor((translateStore.count / translateStore.limit) * 100)}%`"
    />
    <ElmInlineText
      v-if="translateStore.count && translateStore.limit"
      :text="`  | ${translateStore.count} / ${translateStore.limit}`"
      :style="{ opacity: 0.5 }"
    />
  </ElmParagraph>
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
import { ElmCodeBlock, ElmInlineText, ElmParagraph } from '@elmethis/core'
import type { opacify } from 'polished'

import { useTranslateStore } from '~/stores/translateStore'

const translateStore = useTranslateStore()

const text = ref('')

watch(text, translateStore.setText)
onMounted(async () => {
  if (translateStore.text) text.value = translateStore.text
  await translateStore.fetchUsage()
})
</script>

<style scoped lang="scss"></style>
