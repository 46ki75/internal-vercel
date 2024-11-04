<template>
  <div class="container">
    <div>
      <v-text-field
        width="400px"
        max-width="95vw"
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        clearable
      ></v-text-field>
      <v-btn
        block
        @click="handleLogin(password)"
        :loading="authStore.isLoginLoading"
      >
        SUBMIT
      </v-btn>
      <div class="error">
        <ElmInlineText
          v-if="authStore.isLoginError"
          text="An Error occured."
          color="#b36472"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmInlineText } from '@elmethis/core'

import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

const router = useRouter()

const password = ref<string>('')

const handleLogin = async (password: string) => {
  const isSuccess = await authStore.login(password)
  if (isSuccess) router.push('/')
}
</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 1rem;
}
</style>
