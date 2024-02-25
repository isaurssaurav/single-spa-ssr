<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!222')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>