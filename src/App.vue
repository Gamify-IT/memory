<template>
  <div id="app">
    <div id="GamePanel"><GamePanel /></div>
    <ContentModal
      v-if="showModal"
      :cardContent="cardContent"
      @open-modal="openModal"
    >
      <button @click="closeModal">Close</button>
    </ContentModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GamePanel from "./components/GamePanel.vue";
import ContentModal from "./components/ContentModal.vue";
import { CardContent } from "./types/DataModels";
import eventBus from "./eventBus";
export default defineComponent({
  name: "App",
  components: {
    GamePanel,
    ContentModal,
  },
  created() {
    eventBus.on("open-modal", (cardContent: CardContent) => {
      this.openModal(cardContent);
    });
  },
  data() {
    return {
      showModal: false,
      cardContent: { content: "", type: "", id: 0 },
    };
  },
  methods: {
    openModal(cardContent: CardContent) {
      this.showModal = true;
      this.cardContent = cardContent;
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
#app {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
