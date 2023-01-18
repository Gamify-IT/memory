<template>
  <div id="MemoryPanel">
    <div id="gridContainer" class="gloss">
      <div v-for="(card, index) in cards" :key="index">
        <MemoryCard
          :cardContent="card"
          :index="index"
          :canTurn="canTurnCard"
          v-show="!card.found"
          @cardToggle="test"
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
import { defineComponent, PropType } from "vue";
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
    };
  },
  methods: {
    test(cardIndex: number) {
      if (cardIndex == this.firstCardIndex) return;
      if (this.openCardCount == 0) {
        this.firstCardIndex = cardIndex;
      } else if (this.openCardCount == 1) {
        this.resetCards();
        const card: CardData = this.cards[cardIndex];
        if (card.pairid == this.cards[this.firstCardIndex].pairid) {
          console.log("You found a pair!");
          this.addPairToSummary(cardIndex, this.firstCardIndex);
        }
      }
      this.openCardCount++;
    },
    resetCards() {
      this.canTurnCard = false;
      setTimeout(() => {
        this.openCardCount = 0;
        this.canTurnCard = true;
      }, 500);
    },
    addPairToSummary(id1: number, id2: number) {
      this.foundPairs.push(new CardPair(this.cards[id1], this.cards[id2]));
      setTimeout(() => {
        this.cards[id1].found = true;
        this.cards[id2].found = true;
      }, 500);
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
</style>
