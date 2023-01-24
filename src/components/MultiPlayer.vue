<template>
  <h1>Work in Progress</h1>
  <button class="button goback-button" @click="redirectToStartPage()">
    Go Back
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function redirectToStartPage() {
  router.push({ path: "/" });
}
</script>
