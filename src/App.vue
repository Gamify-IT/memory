<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(()=>{
  const backgroundSound = new Audio("@/assets/music/background_music.mp3");
  backgroundSound.loop = true;
  backgroundSound.play();
});
</script>
