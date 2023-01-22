<template>
  <GamePanel />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GamePanel from "./components/GamePanel.vue";
export default defineComponent({
  name: "App",
  components: {
    GamePanel,
  },
});
</script>
