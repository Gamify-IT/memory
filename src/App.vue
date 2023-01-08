<script lang="ts">
import { defineComponent, ref } from "vue";
import MemoryCard from "./components/MemoryCard.vue";
import CardContent from "./Types/CardContent";
export default defineComponent({
  name: "App",
  components: { MemoryCard },
  /*setup() {
    const cards = ref<CardContent[]>([
      { content: "test", type: "text", id: 1, pairid: 1 },
    ]);
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
    return { cards };
  },*/
  data() {
    return {
      cardContent: {
        content: "@/assets/images/ghost.jpg",
        type: "text",
        id: 0,
        pairid: 0,
      } as CardContent,
    };
  },
});
</script>

<template>
  <div class="app">
    <div id="test"><MemoryCard :cardContent="cardContent" /></div>
  </div>
  <!-- :cards="cards"  -->
</template>

<style scoped>
#test {
  width: 200px;
  height: 200px;
}
</style>
