<template>
  <h1>Memory</h1>
  <button class="button" @click="redirectToSingleplayer()">
    <span>Singleplayer</span>
  </button>
  <button class="button multiplayer-button" @click="redirectToMultiplayer()">
    <span>Multiplayer</span>
  </button>
  <button class="button close-button" @click="closeGame()">
    <span>Close Game</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function redirectToSingleplayer() {
  router.push({ path: "/singleplayer" });
}
function redirectToMultiplayer() {
  router.push({ path: "/multiplayer" });
}
function closeGame() {
  window.parent.postMessage("CLOSE ME");
}
</script>

<style scoped>
h1 {
  color: black;
  font-size: 500%;
  top: 20%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.multiplayer-button {
  margin-top: 25%;
}

.close-button {
  margin-top: 30%;
}
</style>
