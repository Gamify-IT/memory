<template>
  <div id="container">
    <div class="card-container">
      <MemoryCard
        :cardContent="pair.card1"
        :canFlip="false"
        :initiallyRevealed="true"
      />
    </div>
    <div class="card-container">
      <MemoryCard
        :cardContent="pair.card2"
        :canFlip="false"
        :initiallyRevealed="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MemoryCard from "./MemoryCard.vue";
import { CardPair } from "../types/data-models";
import { PropType } from "vue";
export default defineComponent({
  name: "PairItem",
  components: { MemoryCard },
  props: {
    pair: {
      type: Object as PropType<CardPair>,
      required: true,
    },
  },
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 30%;
  background-color: rgb(125, 125, 125);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(125, 125, 125);
  width: 45%;
  height: 90%;
}
.flip {
  transform: rotateY(180deg);
}
</style>
