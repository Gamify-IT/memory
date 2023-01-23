<template>
  <button
    class="goback-button shadow-button"
    @click="redirecredirectToStartPage()"
  >
    Go Back
  </button>
  <div id="game-panel">
    <div id="memory-panel" @click="manualReset">
      <div id="grid-container" class="gloss">
        <div v-for="(card, index) in cards" :key="index">
          <MemoryCard
            :cardContent="card"
            :canFlip="canFlipCards"
            v-show="!card.found"
            @cardReveal="cardRevealProcedure"
            @cardHide="cardHideProcedure"
            @openModal="openModal"
          />
        </div>
      </div>
    </div>
    <div id="summary-panel" class="gloss">
      <div id="heading">Summary</div>
      <div id="scrollbar">
        <PairItem
          v-for="(pair, index) in foundPairs"
          :key="index"
          :pair="pair"
          @openModal="openModal"
        />
      </div>
    </div>
    <ContentModal v-if="showModal" :cardData="modalContent">
      <button id="closeButton" @click="closeModal">Close</button>
    </ContentModal>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { CardData, CardPair } from "../types/data-models";
import { MemoryController } from "@/types/memory-controller";

const router = useRouter();
const cards = ref([] as CardData[]);
const foundPairs = ref([] as CardPair[]);
const canFlipCards = ref(true);
const showModal = ref(false);
const modalContent = ref({} as CardData);
let openCardCount = 0;
let firstCard: CardData | undefined = undefined;
let resetTimeout = 0;
let allowReset = false;
onMounted(() => {
  cards.value = new MemoryController().gameData.cards;
});
function openModal(cardContent: CardData) {
  showModal.value = true;
  modalContent.value = cardContent;
}
function closeModal() {
  showModal.value = false;
}
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
function redirecredirectToStartPage() {
  router.push({ path: "/" });
}
</script>

<style scoped>
#game-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3%;
  padding: 1%;
  height: 92%;
}
#grid-container {
  display: grid;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, calc(24.9% - 5px));
  grid-template-rows: repeat(3, calc(33.2% - 5px));
  gap: 5px;
  z-index: 1;
}
#memory-panel {
  order: 1;
  border: none;
  flex-grow: 3;
  z-index: 1;
}
#summary-panel {
  border: none;
  order: 2;
  height: 100%;
  flex: auto;
  z-index: 0;
}
#heading {
  padding: 16px;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  border-bottom: 3px solid rgb(52, 52, 52);
  z-index: 1;
}
#scrollbar {
  margin: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 50px - 2em);
  z-index: 1;
}
#overlay {
  background-color: rgba(52, 52, 52, 0.1);
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
.gloss {
  box-shadow: 0 3px 25px rgb(60, 60, 60);
  background-color: rgb(244, 244, 244);
  z-index: 1;
}
#closeButton {
  border: 1px solid black;
  background: grey;
  color: white;
}
#closeButton:hover {
  cursor: pointer;
}
.goback-button {
  background-color: none;
  border: none;
  color: black;
  padding: 4px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.shadow-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
