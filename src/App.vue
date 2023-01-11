<template>
  <div id="MemoryBox"><GamePanel /></div>
  <div id="PairBox"><SummaryPanel /></div>
  <div class="center">
    <div class="app"><HeaderWebsite /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderWebsite from "./components/HeaderWebsite.vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import GamePanel from "./components/GamePanel.vue";
import CardContent from "./Types/CardContent";
export default defineComponent({
  name: "App",
  components: {
    SummaryPanel,
    GamePanel,
    HeaderWebsite,
  },
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
