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
      <v-btn block @click="login(password)" :loading="isLoading">
        SUBMIT
      </v-btn>
      <div class="error">
        <ElmInlineText
          v-if="isError"
          text="An Error occured."
          color="#b36472"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmInlineText } from '@elmethis/core'

const router = useRouter()

const password = ref<string>('')
const isError = ref(false)
const isLoading = ref(false)

const login = async (password: string) => {
  isLoading.value = true
  isError.value = false
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    if (!response.ok) {
      throw new Error('An error occured.')
    }
    router.push('/')
  } catch (error) {
    isError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
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
