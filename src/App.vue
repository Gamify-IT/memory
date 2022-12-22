<script lang="ts">
import { defineComponent, ref } from "vue";
import MemoryCard from "./components/MemoryCard.vue";
export default defineComponent({
  name: "App",
  components: { MemoryCard },
});
const cards = ref([
  { id: 1, text: "Hallo" },
  { id: 2, text: "Test" },
  { id: 3, text: "Yay" },
]);
</script>

<template>
  <div class="app">test</div>
  <MemoryCard v-for="card in cards" :key="card.id" :text="card.text">
  </MemoryCard>
</template>
