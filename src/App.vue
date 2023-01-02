<script lang="ts">
import { defineComponent, ref } from "vue";
import MemoryCard from "./components/MemoryCard.vue";
import CardContent from "./Types/CardContent";
export default defineComponent({
  name: "App",
  components: { MemoryCard },
  setup() {
    const cards = ref<CardContent[]>([
      { content: "test", type: "text", id: 1, pairid: 1 },
    ]);

    return { cards };
  },
});
</script>

<template>
  <div class="app"><MemoryCard /></div>
  <!-- :cards="cards"  -->
</template>
