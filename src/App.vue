<script lang="ts">
import { defineComponent } from "vue";
import MemoryCard from "./components/MemoryCard.vue";
export default defineComponent({
  name: "App",
  components: { MemoryCard },
});
</script>

<template>
  <div class="app"><MemoryCard /></div>
</template>
