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
      <v-btn
        :loading="ankiStore.currentLearn == null"
        @click="
          open(ankiStore.currentLearn?.url.replace('https://', 'notion://'))
        "
      >
        <PencilSquareIcon class="icon" />
        <ElmInlineText text="edit" />
      </v-btn>

      <v-btn @click="create" :loading="ankiStore.isCreateLoading">
        <PlusIcon class="icon" />
        <ElmInlineText text="New" />
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmInlineText } from '@elmethis/core'
import { PencilSquareIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { useAnkiStore } from '~/stores/ankiStore'

const ankiStore = useAnkiStore()

const open = (url?: string) => {
  if (url != null && window != null) {
    window.open(url, '_blank')
  }
}

const create = async () => {
  if (!ankiStore.isCreateLoading) {
    const { url } = await ankiStore.createNewAnkiCard()
    open(url)
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 16px;
}
</style>
