<template>
  <div id="nav">
    <router-link to="/"> StartGame</router-link>
  </div>
  <router-view />
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
  width: 100%;
  height: 100%;
}
#nav {
  padding: 30px;
}
</style>
