<template>
  <div id="memory-panel" @click="manualReset">
    <div id="grid-container" class="gloss">
      <div v-for="(card, index) in cards" :key="index">
        <MemoryCard
          :cardContent="card"
          :canFlip="canFlipCards"
          v-show="!card.found"
          @cardReveal="cardRevealProcedure"
          @cardHide="cardHideProcedure"
        />
      </div>
    </div>
  </div>
  <div id="summary-panel" class="gloss">
    <div id="heading">Summary</div>
    <div id="scrollbar">
      <PairItem v-for="(pair, index) in foundPairs" :key="index" :pair="pair" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MemoryCard from "./MemoryCard.vue";
import PairItem from "./PairItem.vue";
import { CardData, CardPair } from "../types/data-models";
import { MemoryController } from "@/types/memory-controller";

const cards = ref([] as CardData[]);
const foundPairs = ref([] as CardPair[]);
const canFlipCards = ref(true);
let openCardCount = 0;
let firstCard: CardData | undefined = undefined;
let resetTimeout = 0;
let allowReset = false;

onMounted(() => {
  cards.value = new MemoryController().gameData.cards;
});

function cardRevealProcedure(clickedCard: CardData) {
  if (firstCard === clickedCard) return;
  clickedCard.flipped = true;
  if (openCardCount == 0) {
    firstCard = clickedCard;
  } else if (openCardCount == 1) {
    if (clickedCard.pairid == firstCard?.pairid) {
      console.log("You found a pair!");
      addPairToSummary(clickedCard, firstCard);
    } else {
      resetCards();
    }
    firstCard = undefined;
  }
  openCardCount++;
}

function cardHideProcedure(clickedCard: CardData) {
  clickedCard.flipped = false;
}

function manualReset() {
  if (allowReset) {
    openCardCount = 0;
    canFlipCards.value = true;
    clearTimeout(resetTimeout);
    allowReset = false;
  }
}

function resetCards() {
  canFlipCards.value = false;
  allowReset = true;
  resetTimeout = setTimeout(() => {
    openCardCount = 0;
    canFlipCards.value = true;
    allowReset = false;
  }, 5000);
}

function addPairToSummary(card1: CardData, card2: CardData) {
  canFlipCards.value = false;
  setTimeout(() => {
    foundPairs.value.push(new CardPair(card1, card2));
    card1.found = true;
    card2.found = true;
    openCardCount = 0;
    canFlipCards.value = true;
  }, 1000);
}
</script>

<style scoped>
#grid-container {
  display: grid;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, calc(24.9% - 5px));
  grid-template-rows: repeat(3, calc(33.2% - 5px));
  gap: 5px;
}
#memory-panel {
  position: absolute;
  border: none;
  margin-top: 2.5%;
  height: 88%;
  width: 65%;
  margin-left: 1%;
}
#summary-panel {
  position: absolute;
  border: none;
  margin-top: 2.5%;
  height: 88%;
  width: 25%;
  margin-left: 73%;
}

#heading {
  padding: 16px;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  border-bottom: 3px solid rgb(52, 52, 52);
}
#scrollbar {
  margin: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 50px - 2em);
}
#overlay {
  background-color: rgba(52, 52, 52, 0.1);
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
</style>
