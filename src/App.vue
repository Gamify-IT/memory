<template>
  <div id="MemoryBox"><GamePanel /></div>
  <div id="PairBox"><SummaryPanel /></div>
  <div class="center">
    <div class="app"><HeaderWebsite /></div>
    <button onclick="startGame()" class="button button1">Start Game</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HeaderWebsite from "@/components/HeaderWebsite.vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import GamePanel from "./components/GamePanel.vue";
import MemoryCard from "./components/MemoryCard.vue";
import CardContent from "./Types/CardContent";
export default defineComponent({
  name: "App",
  components: {
    SummaryPanel,
    GamePanel,
    HeaderWebsite,
    MemoryCard
  },
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
