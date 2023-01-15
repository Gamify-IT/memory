<template>
  <div id="MemoryBox"><GamePanel /></div>
  <div id="PairBox"><SummaryPanel /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SummaryPanel from "./components/SummaryPanel.vue";
import GamePanel from "./components/GamePanel.vue";
export default defineComponent({
  name: "App",
  components: {
    SummaryPanel,
    GamePanel,
  },
});
</script>
