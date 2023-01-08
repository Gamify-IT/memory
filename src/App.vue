<template>
  <div id="MemoryBox"><GamePanel /></div>
  <div id="PairBox"><SummaryPanel /></div>
  <div class="center">
    <div class="app"><HeaderWebsite /></div>
    <button onclick="startGame()" class="button button1">Start Game</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderWebsite from "@/components/HeaderWebsite.vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import GamePanel from "./components/GamePanel.vue";
export default defineComponent({
  name: "App",
  components: {
    SummaryPanel,
    GamePanel,
    HeaderWebsite
  },
document.getElementById("MemoryBox")?.style;
function startGame() {
  document.getElementById("MemoryBox")!.style.borderColor = "white";
}
</script>
