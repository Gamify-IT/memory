<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
const backgroundSound = new Audio("@/assets/music/background_music.mp3");

onMounted(() => {
  backgroundSound.loop = true;
  backgroundSound.play();
});

onUnmounted(() => {
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
});
</script>
