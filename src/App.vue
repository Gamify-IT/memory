<template>
  <div id="app">
    <GamePanel />
  </div>
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

<style scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
