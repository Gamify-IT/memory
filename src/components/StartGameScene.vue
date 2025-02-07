<template>
  <!-- Title of the game -->
  <h1>Memory</h1>
  <!-- Button to navigate to singleplayer mode -->
  <button class="button" @click="redirectToSingleplayer()">
    <span>Singleplayer</span>
  </button>
  <!-- Button to navigate to multiplayer mode (currently disabled) -->
  <button
    class="button multiplayer-button"
    @click="redirectToMultiplayer()"
    title="Not implemented yet"
    disabled
  >
    <span>Multiplayer</span>
  </button>
  <!-- Button to close the game -->
  <button class="button close-button" @click="handleCloseGame()">
    <span>Close Game</span>
  </button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import clickSoundSource from "@/assets/music/click_sound.mp3";
import { MemoryController } from "@/types/memory-controller";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const memoryController = new MemoryController();
let clickSound: HTMLAudioElement;

onMounted(async () => {
  clickSound = memoryController.createAudioWithVolume(clickSoundSource);
});

/**
 * Redirects to the singleplayer route
 */
function redirectToSingleplayer() {
  playClickSound();
  router.push({ path: "/singleplayer/" + route.params.id });
}

/**
 * Redirects to the multiplayer route (disabled for now)
 */
function redirectToMultiplayer() {
  playClickSound();
  router.push({ path: "/multiplayer/" + route.params.id });
}

/**
 * Closes the game by sending a message to the parent window
 */
function closeGame() {
  window.parent.postMessage("CLOSE ME");
}

/**
 * Plays the click sound
 */
function playClickSound() {
  clickSound.play();
}

/**
 * Handles the closing of the game with a delay after the sound plays
 */
async function handleCloseGame() {
  await playClickSound();
  setTimeout(() => {
    closeGame();
  }, 500);
}
</script>

<style scoped>
/* Title styling */
h1 {
  color: black;
  font-size: 500%;
  top: 20%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

/* Styling for the multiplayer button */
.multiplayer-button {
  margin-top: 25%;
}

/* Styling for the close button */
.close-button {
  margin-top: 30%;
}
</style>
