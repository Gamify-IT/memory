<template>
  <GamePanel />
  <SummaryPanel />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
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
