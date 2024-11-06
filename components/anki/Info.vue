<template>
  <div>
    <div class="text-container">
      <span>
        <ElmInlineText :text="`Remain: `" bold />
        <ElmInlineText
          v-if="ankiStore.remainCount"
          :text="`${ankiStore.remainCount}`"
        />
      </span>
      <span>
        <ElmInlineText :text="`Queue: `" bold />
        <ElmInlineText :text="String(ankiStore.learnList.length)" />
      </span>
    </div>

    <div class="button-container">
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

    <template v-if="ankiStore.currentLearn != null">
      <AnkiTags
        :tags="
          ankiStore.currentLearn.tags.map((tag) => ({
            text: tag.name,
            color: tag.color
          }))
        "
      />
    </template>
    <template v-else>
      <ElmBlockFallback />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ElmInlineText, ElmBlockFallback } from '@elmethis/core'
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
    open(url.replace('https://', 'notion://'))
  }
}
</script>

<style scoped lang="scss">
.text-container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.button-container {
  margin-block: 1rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}

.icon {
  width: 16px;
}
</style>
