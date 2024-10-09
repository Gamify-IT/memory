<template>
    <!-- Button to navigate back to the start page -->
  <button class="goback-button" @click="redirectToStartPage()">
    <span>Go Back</span>
  </button>
  <!-- Error message if backend is not reachable -->
  <div id="error-text" v-if="hasPostError">Backend not reachable.</div>
  <!-- Error message if config cannot be fetched -->
  <div id="error-config-text" v-if="hasConfigError">
    Because the config could not be fetched, the game result can't be
    transmitted.
  </div>
  <!-- Game panel with memory game cards and summary -->
  <div id="game-panel">
    <!-- Memory panel with the grid of cards -->
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
      <!-- Finish screen with rewards when game is completed -->
      <div id="finish-screen" v-if="isFinished && !hasConfigError">
        🏆 Well done! You've gained {{ store.state.rewards }} coins! 🏆
      </div>
    </div>
    <!-- Summary panel displaying found pairs -->
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
    <!-- Modal for displaying detailed content of a card -->
    <ContentModal v-if="showModal" :cardData="modalContent">
      <button id="close-button" @click="closeModal">Close</button>
    </ContentModal>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import MemoryCard from "./MemoryCard.vue";
import ContentModal from "./ContentModal.vue";
import PairItem from "./PairItem.vue";
import { CardData, CardPair, CardSelection } from "@/types/data-models";
import { MemoryController } from "@/types/memory-controller";
import store from "@/store/index";
import triumphSound from '@/assets/music/trumpets.mp3';
import swipeSoundSource from '@/assets/music/swipe_sound.mp3';
import successSoundSource from '@/assets/music/success_sound.mp3';
import clickSoundSource from '@/assets/music/click_sound.mp3';
import wrongAnswerSoundSource from '@/assets/music/wrong_answer_sound.mp3';

const router = useRouter();
const cards = ref([] as CardData[]);
const foundPairs = ref([] as CardPair[]);
const canFlipCards = ref(true);
const showModal = ref(false);
const modalContent = ref({} as CardData);
const hasPostError = ref();
const hasConfigError = ref();
let memoryController: MemoryController;
let gameStarted = ref();
const isFinished = computed(
  () => foundPairs.value.length == cards.value.length / 2
);

// Watches for game state change to handle configuration error
watch(gameStarted, (gameStarted) => {
  if (gameStarted) {
    hasConfigError.value = memoryController.hasConfigError;
  }
});

// Watches for game completion and post game result
watch(isFinished, async (isFinished) => {
  if (isFinished) {
    hasPostError.value = await memoryController.postGameResult();
    playSound(triumphSound);
  }
});

let openCardCount = 0;
let firstCard: CardData | undefined = undefined;
let secondCard: CardData | undefined = undefined;
let resetTimeout: ReturnType<typeof setTimeout>;
let allowReset = false;

// Initialize game data on mounted
onMounted(async () => {
  memoryController = new MemoryController();
  cards.value = (await memoryController.fetchData()).cards;
  gameStarted.value = true;
});

// Handles opening of modal
function openModal(cardContent: CardData) {
  showModal.value = true;
  modalContent.value = cardContent;
}

// Closes the modal
function closeModal() {
  showModal.value = false;
}

// Handles the revealed cards (flip)
function cardRevealProcedure(clickedCard: CardData) {
  playSound(swipeSoundSource);
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

// Handles the hidden cards (flip back)
function cardHideProcedure(clickedCard: CardData) {
  clickedCard.flipped = false;
}

// Manual reset of the game (when clicking the memory panel)
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

// Resets the cards after a mismatch
function resetCards() {
  playSound(wrongAnswerSoundSource);
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

// Adds a found pair to the summary
function addPairToSummary(card1: CardData, card2: CardData) {
  playSound(successSoundSource);
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

// Redirects back to the start page
function redirectToStartPage() {
  playSound(clickSoundSource);
  router.back();
}

// Function to play sounds
function playSound(pathToAudioFile: string){
  const sound = memoryController.createAudioWithVolume(pathToAudioFile);
  sound.play();
}

</script>

<style scoped>
/* Layout and styling for the game panel */
#game-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3%;
  padding: 2%;
  height: 92%;
}
/* Grid for displaying memory cards */
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
/* Styling for memory panel */
#memory-panel {
  order: 1;
  border: none;
  flex-grow: 3;
  z-index: 1;
}
/* Finish screen when game is done */
#finish-screen {
  text-align: center;
  font-size: 3em;
  font-weight: 600;
}
/* Styling for summary panel */
#summary-panel {
  border: none;
  order: 2;
  height: 100%;
  flex: auto;
  z-index: 0;
}
/* Styling for heading in summary panel */
#heading {
  padding: 16px;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  border-bottom: 3px solid rgb(52, 52, 52);
  z-index: 1;
}
/* Scroll area for summary pairs */
#scrollbar {
  margin: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 50px - 2em);
  z-index: 1;
}
/* Overlay style for error messages */
#overlay {
  background-color: rgba(52, 52, 52, 0.1);
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
/* Shadow effect for panels */
.shadowed-panel {
  box-shadow: 0 0 25px rgb(60, 60, 60);
  background-color: rgb(244, 244, 244);
  z-index: 1;
}
/* Close button for modal */
#close-button {
  border: 1px solid black;
  background: grey;
  color: white;
}
/* Change cursor to pointer on hover over the close button */
#close-button:hover {
  cursor: pointer;
}
/* Styles for the 'Go Back' button */
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
/* Styles for the span within the 'Go Back' button */
.goback-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
/* Styles for the pseudo-element after the span in the 'Go Back' button */
.goback-button span:after {
  content: "\00ab";
  position: absolute;
  opacity: 0;
  top: 0;
  left: -20px;
  transition: 0.5s;
}
/* Hover effect for the 'Go Back' button's span */
.goback-button:hover span {
  padding-left: 25px;
}
/* Hover effect for the pseudo-element after the span in the 'Go Back' button */
.goback-button:hover span:after {
  opacity: 1;
  left: 0;
}
/* Styles for error message when backend is not reachable */
#error-text {
  left: 0;
  right: 0;
  position: absolute;
  text-align: center;
  color: red;
  font-size: 200%;
}
/* Styles for error message related to configuration fetching */
#error-config-text {
  left: 2%;
  right: 34.6%;
  position: absolute;
  top: 4%;
  text-align: center;
  color: red;
  font-size: 500%;
  z-index: 999;
}
</style>
