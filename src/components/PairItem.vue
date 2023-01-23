<template>
  <div id="container">
    <div class="card-container">
      <MemoryCard
        :cardContent="pair.card1"
        :canFlip="false"
        :initiallyRevealed="true"
        @openModal="$emit('openModal', pair.card1)"
      />
    </div>
    <div class="card-container">
      <MemoryCard
        :cardContent="pair.card2"
        :canFlip="false"
        :initiallyRevealed="true"
        @openModal="$emit('openModal', pair.card2)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardPair } from "../types/data-models";
import { PropType } from "vue";
import MemoryCard from "./MemoryCard.vue";
defineProps({
  pair: {
    type: Object as PropType<CardPair>,
    required: true,
  },
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 30%;
  background-color: rgb(186, 186, 186);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 45%;
  height: 90%;
}
.flip {
  transform: rotateY(180deg);
}
</style>
