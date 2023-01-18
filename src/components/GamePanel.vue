<template>
  <div id="overlay" v-if="allowReset" @click="manualReset"></div>
  <div id="MemoryPanel">
    <div id="gridContainer" class="gloss">
      <div v-for="(card, index) in cards" :key="index">
        <MemoryCard
          :cardContent="card"
          :index="index"
          :canTurn="canTurnCard"
          v-show="!card.found"
          @cardToggle="cardClickProcedure"
        />
      </div>
    </div>
  </div>
  <div id="SummaryPanel" class="gloss">
    <div id="heading">Summary</div>
    <div id="scrollbar">
      <PairItem
        v-for="(pair, index) in foundPairs"
        :key="index"
        :pair="pair"
        class="pairItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MemoryCard from "./MemoryCard.vue";
import PairItem from "./PairItem.vue";
import { CardData, CardPair } from "../types/DataModels";
import { MemoryController } from "@/types/MemoryController";

export default defineComponent({
  name: "GamePanel",
  components: { MemoryCard, PairItem },
  data() {
    return {
      cards: [] as CardData[],
      foundPairs: [] as CardPair[],
      openCardCount: 0,
      canTurnCard: true,
      firstCardIndex: -1,
      disabledCards: [] as boolean[],
      resetTimeout: 0,
      allowReset: false,
    };
  },
  methods: {
    cardClickProcedure(cardIndex: number) {
      if (cardIndex == this.firstCardIndex) return;
      if (this.openCardCount == 0) {
        this.firstCardIndex = cardIndex;
      } else if (this.openCardCount == 1) {
        const card: CardData = this.cards[cardIndex];
        if (card.pairid == this.cards[this.firstCardIndex].pairid) {
          console.log("You found a pair!");
          this.addPairToSummary(cardIndex, this.firstCardIndex);
        } else {
          this.resetCards();
        }
        this.firstCardIndex = -1;
      }
      this.openCardCount++;
    },
    manualReset() {
      if (this.allowReset) {
        this.openCardCount = 0;
        this.canTurnCard = true;
        clearTimeout(this.resetTimeout);
        this.allowReset = false;
      }
    },
    resetCards() {
      this.canTurnCard = false;
      this.allowReset = true;
      this.resetTimeout = setTimeout(() => {
        this.openCardCount = 0;
        this.canTurnCard = true;
        this.allowReset = false;
      }, 4000);
    },
    addPairToSummary(id1: number, id2: number) {
      this.canTurnCard = false;
      setTimeout(() => {
        this.foundPairs.push(new CardPair(this.cards[id1], this.cards[id2]));
        this.cards[id1].found = true;
        this.cards[id2].found = true;
        this.openCardCount = 0;
        this.canTurnCard = true;
      }, 1000);
    },
  },
  mounted: function () {
    this.cards = new MemoryController().gameData.cards;
  },
});
</script>

<style scoped>
#gridContainer {
  display: grid;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, calc(24.9% - 5px));
  grid-template-rows: repeat(3, calc(33.2% - 5px));
  gap: 5px;
}
#MemoryPanel {
  position: absolute;
  border: none;
  margin-top: 2.5%;
  height: 88%;
  width: 65%;
  margin-left: 1%;
}
#SummaryPanel {
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
