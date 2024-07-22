<template>
  <h1>Memory</h1>
  <button class="button" @click="redirectToSingleplayer()">
    <span>Singleplayer</span>
  </button>
  <button
    class="button multiplayer-button"
    @click="redirectToMultiplayer()"
    title="Not implemented yet"
    disabled
  >
    <span>Multiplayer</span>
  </button>
  <button class="button close-button" @click="handleCloseGame()">
    <span>Close Game</span>
  </button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function redirectToSingleplayer() {
  playClickSound();
  router.push({ path: "/singleplayer/" + route.params.id });
}
function redirectToMultiplayer() {
  playClickSound();
  router.push({ path: "/multiplayer/" + route.params.id });
}
function closeGame() {
  window.parent.postMessage("CLOSE ME");
}


async function handleCloseGame() {
  await playClickSound();
    setTimeout(() => {
      closeGame();
    }, 500);
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
