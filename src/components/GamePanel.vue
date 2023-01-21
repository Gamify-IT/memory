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

<script lang="ts">
import { defineComponent } from "vue";
import MemoryCard from "./MemoryCard.vue";
import PairItem from "./PairItem.vue";
import { CardData, CardPair } from "../types/data-models";
import { MemoryController } from "@/types/memory-controller";

export default defineComponent({
  name: "GamePanel",
  components: { MemoryCard, PairItem },

  data() {
    return {
      cards: [] as CardData[],
      foundPairs: [] as CardPair[],
      openCardCount: 0,
      canFlipCards: true,
      firstCard: undefined as CardData | undefined,
      disabledCards: [] as boolean[],
      resetTimeout: 0,
      allowReset: false,
    };
  },

  mounted: function () {
    this.cards = new MemoryController().gameData.cards;
  },

  methods: {
    cardRevealProcedure(clickedCard: CardData) {
      if (this.firstCard === clickedCard) return;
      clickedCard.flipped = true;
      if (this.openCardCount == 0) {
        this.firstCard = clickedCard;
      } else if (this.openCardCount == 1) {
        if (clickedCard.pairid == this.firstCard?.pairid) {
          console.log("You found a pair!");
          this.addPairToSummary(clickedCard, this.firstCard);
        } else {
          this.resetCards();
        }
        this.firstCard = undefined;
      }
      this.openCardCount++;
    },

    cardHideProcedure(clickedCard: CardData) {
      clickedCard.flipped = false;
    },

    manualReset() {
      if (this.allowReset) {
        this.openCardCount = 0;
        this.canFlipCards = true;
        clearTimeout(this.resetTimeout);
        this.allowReset = false;
      }
    },

    resetCards() {
      this.canFlipCards = false;
      this.allowReset = true;
      this.resetTimeout = setTimeout(() => {
        this.openCardCount = 0;
        this.canFlipCards = true;
        this.allowReset = false;
      }, 5000);
    },

    addPairToSummary(card1: CardData, card2: CardData) {
      this.canFlipCards = false;
      setTimeout(() => {
        this.foundPairs.push(new CardPair(card1, card2));
        card1.found = true;
        card2.found = true;
        this.openCardCount = 0;
        this.canFlipCards = true;
      }, 1000);
    },
  },
});
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
.flip {
  transform: rotateY(180deg);
}
</style>
