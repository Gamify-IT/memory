<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import backgroundMusicSource from '/src/assets/music/background_music.mp3'
const backgroundMusic = new Audio(backgroundMusicSource);

onMounted(() => {
  backgroundMusic.loop = true;
  backgroundMusic.play();
});

onUnmounted(() => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});
</script>
