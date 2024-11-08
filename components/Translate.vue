<template>
  <div>
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
  </div>
  <div :style="{ marginBlock: '2rem' }">
    <ElmProgress
      :loading="!(translateStore.count && translateStore.limit)"
      :value="translateStore.count ?? 0"
      :max="translateStore.limit"
      weight="4px"
    />
  </div>

  <ElmParagraph>
    <v-textarea label="Japanese" v-model="text" variant="outlined"></v-textarea>
  </ElmParagraph>

  <ElmButton
    block
    :loading="translateStore.isLoading"
    @click="translateStore.fetchTranslate"
  >
    TRANSLATE
  </ElmButton>

  <div class="loading">
    <ElmArrowIcon direction="down" :loading="translateStore.isLoading" />
  </div>

  <ElmCodeBlock
    v-if="translateStore.result"
    :code="translateStore.result.text"
    :style="{ marginBlock: '2rem' }"
  />
</template>

<script setup lang="ts">
import {
  ElmCodeBlock,
  ElmInlineText,
  ElmParagraph,
  ElmProgress,
  ElmButton,
  ElmArrowIcon
} from '@elmethis/core'

import { useTranslateStore } from '~/stores/translateStore'

const translateStore = useTranslateStore()

const text = ref('')

watch(text, translateStore.setText)
onMounted(async () => {
  if (translateStore.text) text.value = translateStore.text
  await translateStore.fetchUsage()
})
</script>

<style scoped lang="scss">
.loading {
  margin-block: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
