<template>
  <!-- Router view where components will be displayed based on route -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import backgroundMusicSource from "@/assets/music/background_music.mp3";
import { MemoryController } from "@/types/memory-controller";

const memoryController = new MemoryController();
let backgroundMusic: HTMLAudioElement;

/**
 * Lifecycle hook that runs when the component is mounted
 */
onMounted(async () => {
  await memoryController.fetchData();
  backgroundMusic = memoryController.createAudioWithVolume(
    backgroundMusicSource
  );

  backgroundMusic.loop = true;
  backgroundMusic.play();
});

/**
 * Lifecycle hook that runs when the component is unmounted
 */
onUnmounted(() => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});
</script>
