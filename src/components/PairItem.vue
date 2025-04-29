<template>
  <!-- Container holding the memory card pairs -->
  <div id="container">
    <!-- Card container for the first card in the pair -->
    <div class="card-container">
      <!-- MemoryCard component for the first card -->
      <MemoryCard
        :cardContent="pair.card1"
        :canFlip="false"
        :initiallyRevealed="true"
        @openModal="$emit('openModal', pair.card1)"
      />
    </div>
    <!-- Card container for the second card in the pair -->
    <div class="card-container">
      <!-- MemoryCard component for the second card -->
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

/**
 * Define the props of this component
 */
defineProps({
  pair: {
    type: Object as PropType<CardPair>,
    required: true,
  },
});
</script>

<style scoped>
/* Style for the container holding both card containers */
#container {
  width: 100%;
  height: 30%;
  background-color: rgb(186, 186, 186);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}
/* Style for each individual card container */
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 45%;
  height: 90%;
}
/* Flip class to rotate cards when applied */
.flip {
  transform: rotateY(180deg);
}
</style>
