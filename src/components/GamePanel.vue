<template>
  <div id="GamePanel">
    <div id="MemoryPanel">
      <div id="gridContainer" class="gloss">
        <div v-for="card in cardContent" :key="card.id">
          <MemoryCard :cardContent="card" @openModal="openModal" />
        </div>
      </div>
    </div>
    <div id="SummaryPanel" class="gloss">
      <div id="heading">Summary</div>
      <div id="scrollbar">
        <PairItem
          v-for="(pair, index) in pairs"
          :key="index"
          :text="pair.toString()"
          class="pairItem"
          @openModal="openModal"
        />
      </div>
    </div>
  </div>
  <ContentModal v-if="showModal" :cardContent="content">
    <button id="closeButton" @click="closeModal">Close</button>
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MemoryCard from "./MemoryCard.vue";
import ContentModal from "./ContentModal.vue";
import PairItem from "./PairItem.vue";
import { CardContent } from "../types/DataModels";
export default defineComponent({
  name: "GamePanel",
  components: { MemoryCard, PairItem, ContentModal },
  data() {
    return {
      pairs: Array.from(Array<string>(12).keys()),
      showModal: false,
      content: { content: "", type: "", id: 0 },
      cardContent: [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
          type: "text",
          id: 0,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 1,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 2, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 3,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 4, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 5,
          pairid: 0,
        } as CardContent,
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
          type: "text",
          id: 6,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 7,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 8, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 9,
          pairid: 0,
        } as CardContent,
        {
          content: "some text",
          type: "text",
          id: 10,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 11,
          pairid: 0,
        } as CardContent,
      ],
    };
  },
  methods: {
    openModal(cardContent: CardContent) {
      this.showModal = true;
      this.content = cardContent;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
</script>

<style scoped>
#GamePanel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3%;
  padding: 2%;
  height: 92%;
}
#gridContainer {
  display: grid;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, calc(24.9% - 5px));
  grid-template-rows: repeat(3, calc(33.2% - 5px));
  gap: 5px;
  z-index: 1;
}
#MemoryPanel {
  order: 1;
  border: none;
  flex-grow: 3;
  z-index: 1;
}
#SummaryPanel {
  order: 2;
  height: 100%;
  border: none;
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

.gloss {
  box-shadow: 0 3px 25px rgb(60, 60, 60);
  backdrop-filter: blur(7px);
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
</style>
