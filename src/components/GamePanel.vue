<template>
  <button class="goback-button" @click="redirectToStartPage()">
    <span>Go Back</span>
  </button>
  <div id="game-panel">
    <div id="memory-panel" class="shadowed-panel" @click="manualReset">
      <div id="grid-container" v-if="!isFinished">
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
      <div id="finish-screen" v-if="isFinished">Well done!</div>
    </div>
    <div id="summary-panel" class="shadowed-panel">
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
      <button id="close-button" @click="closeModal">Close</button>
    </ContentModal>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import MemoryCard from "./MemoryCard.vue";
import ContentModal from "./ContentModal.vue";
import PairItem from "./PairItem.vue";
import { CardData, CardPair, CardSelection } from "../types/data-models";
import { MemoryController } from "@/types/memory-controller";

const router = useRouter();
const cards = ref([] as CardData[]);
const foundPairs = ref([] as CardPair[]);
const canFlipCards = ref(true);
const showModal = ref(false);
const modalContent = ref({} as CardData);
const isFinished = computed(
  () => foundPairs.value.length == cards.value.length / 2
);
let openCardCount = 0;
let firstCard: CardData | undefined = undefined;
let secondCard: CardData | undefined = undefined;
let resetTimeout: ReturnType<typeof setTimeout>;
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
    secondCard = clickedCard;
    if (clickedCard.pairid == firstCard?.pairid) {
      console.log("You found a pair!");
      addPairToSummary(clickedCard, firstCard);
    } else if (firstCard !== undefined) {
      resetCards();
    }
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
    if (firstCard !== undefined && secondCard !== undefined) {
      firstCard.selection = CardSelection.UNSELECTED;
      secondCard.selection = CardSelection.UNSELECTED;
    }
    firstCard = undefined;
    secondCard = undefined;
  }
}
function resetCards() {
  canFlipCards.value = false;
  allowReset = true;
  if (firstCard !== undefined && secondCard !== undefined) {
    firstCard.selection = CardSelection.MISMATCH;
    secondCard.selection = CardSelection.MISMATCH;
  }
  resetTimeout = setTimeout(() => {
    openCardCount = 0;
    canFlipCards.value = true;
    allowReset = false;
    if (firstCard !== undefined && secondCard !== undefined) {
      firstCard.selection = CardSelection.UNSELECTED;
      secondCard.selection = CardSelection.UNSELECTED;
    }
    firstCard = undefined;
    secondCard = undefined;
  }, 5000);
}
function addPairToSummary(card1: CardData, card2: CardData) {
  canFlipCards.value = false;
  card1.selection = CardSelection.MATCH;
  card2.selection = CardSelection.MATCH;
  setTimeout(() => {
    foundPairs.value.push(new CardPair(card1, card2));
    card1.found = true;
    card2.found = true;
    openCardCount = 0;
    card1.selection = CardSelection.UNSELECTED;
    card2.selection = CardSelection.UNSELECTED;
    canFlipCards.value = true;
  }, 1000);
}
function redirectToStartPage() {
  router.push({ path: "/" });
}
</script>

<style scoped>
#game-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3%;
  padding: 2%;
  height: 92%;
}
#grid-container {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 5px;
  padding: 5px;
  z-index: 1;
}
#memory-panel {
  order: 1;
  border: none;
  flex-grow: 3;
  z-index: 1;
}
#finish-screen {
  text-align: center;
  font-size: 3em;
  font-weight: 600;
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
.shadowed-panel {
  box-shadow: 0 0 25px rgb(60, 60, 60);
  background-color: rgb(244, 244, 244);
  z-index: 1;
}
#close-button {
  border: 1px solid black;
  background: grey;
  color: white;
}
#close-button:hover {
  cursor: pointer;
}
.goback-button {
  display: inline-block;
  position: absolute;
  border-radius: 2%;
  background-color: transparent;
  border: rgb(0, 0, 0);
  color: #000000;
  text-align: center;
  font-size: 20px;
  padding: 5px;
  width: 140px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-left: 0%;
  margin-top: 0%;
  z-index: 999;
}

.goback-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.goback-button span:after {
  content: "\00ab";
  position: absolute;
  opacity: 0;
  top: 0;
  left: -20px;
  transition: 0.5s;
}

.goback-button:hover span {
  padding-left: 25px;
}

.goback-button:hover span:after {
  opacity: 1;
  left: 0;
}
</style>
