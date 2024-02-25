<script setup>
import { ref } from "vue";
const greeting = ref("Hello World!222");
const number = ref(0);
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
  {{ number }}
  <button @click="number++">Click me to increase number</button>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
