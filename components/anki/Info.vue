<template>
  <div>
    <div>
      <ElmInlineText :text="`Remain: `" bold />
      <ElmInlineText
        v-if="!ankiStore.isLearnListLoading && !ankiStore.isBlockLoading"
        :text="`${ankiStore.remainCount}`"
      />
    </div>

    <div>
      <ElmInlineText
        v-if="ankiStore.currentLearn"
        :text="ankiStore.currentLearn?.id"
      />
    </div>

    <div>
      <v-btn
        @click="
          open(ankiStore.currentLearn?.url.replace('https://', 'notion://'))
        "
      >
        <PencilSquareIcon class="icon" />
        <ElmInlineText v-if="ankiStore.currentLearn" text="edit" />
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmInlineText } from '@elmethis/core'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
import { useAnkiStore } from '~/stores/ankiStore'

const ankiStore = useAnkiStore()

const open = (url?: string) => {
  if (url != null && window != null) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 16px;
}
</style>
