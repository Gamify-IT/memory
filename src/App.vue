<template>
  <div id="GamePanel"><GamePanel /></div>
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
#GamePanel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3%;
}
</style>
