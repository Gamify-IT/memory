<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import backgroundMusicSource from '/src/assets/music/background_music.mp3'
import { MemoryController } from "@/types/memory-controller";

const memoryController = new MemoryController();
let backgroundMusic: HTMLAudioElement;

onMounted(async () => {
  await memoryController.fetchData();
  backgroundMusic = memoryController.createAudioWithVolume(backgroundMusicSource);

  backgroundMusic.loop = true;
  backgroundMusic.play();
});

onUnmounted(() => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});
</script>
