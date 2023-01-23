<template>
  <h1>Memory</h1>
  <button class="singleplayer-button" @click="redirecredirectToSingleplayer()">
    <span>Singleplayer</span>
  </button>
  <button class="multiplayer-button" @click="redirecredirectToMultiplayer()">
    <span>Multiplayer</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function redirecredirectToSingleplayer() {
  router.push({ path: "/singleplayer" });
}
function redirecredirectToMultiplayer() {
  router.push({ path: "/multiplayer" });
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
.singleplayer-button {
  vertical-align: middle;
  display: inline-block;
  position: absolute;
  border-radius: 2%;
  background-color: white;
  border: rgb(0, 0, 0);
  color: #000000;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 300px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-left: 42%;
  margin-top: 20%;
  text-align: center;
  z-index: 999;
}

.singleplayer-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.singleplayer-button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.singleplayer-button:hover span {
  padding-right: 25px;
}

.singleplayer-button:hover span:after {
  opacity: 1;
  right: 0;
}

.multiplayer-button {
  vertical-align: middle;
  display: inline-block;
  position: absolute;
  border-radius: 2%;
  background-color: white;
  border: rgb(0, 0, 0);
  color: #000000;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 300px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-left: 42%;
  margin-top: 25%;
  text-align: center;
  z-index: 999;
}

.multiplayer-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.multiplayer-button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.multiplayer-button:hover span {
  padding-right: 25px;
}

.multiplayer-button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
