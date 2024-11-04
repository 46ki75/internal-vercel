<template>
  <div class="container">
    <div>
      <v-text-field
        width="400px"
        max-width="95vw"
        v-model="password"
        label="Password"
        placeholder="Enter your password"
        clearable
      ></v-text-field>
      <v-btn block>SUBMIT</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const password = ref<string>('')
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
