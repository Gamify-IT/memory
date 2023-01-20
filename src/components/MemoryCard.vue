<template>
  <div class="MemoryCard" id="card" ref="card" @click="flipCard()">
    <div class="front"></div>
    <div class="back">
      <p id="text" ref="text">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="image" ref="image" />
      <button id="detailView" @click.stop="openModal">+</button>
    </div>
  </div>
  <ContentModal v-bind="$props" v-if="showModal" @close="closeModal">
    <button @click="closeModal">Close</button>
  </ContentModal>
</template>

<script lang="ts">
import { PropType } from "vue";
import ContentModal from "./ContentModal.vue";
import { CardContent } from "../types/DataModels";
export default {
  components: {
    ContentModal,
  },
  data() {
    return {
      showModal: false,
      showModalText: false,
      showModalImage: false,
    };
  },
  emist: ["close"],
  props: {
    cardContent: {
      type: Object as PropType<CardContent>,
      required: true,
    },
  },
  mounted(this: {
    setContent: () => void;
    $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
  }) {
    this.setContent();
  },
  methods: {
    flipCard(this: any) {
      if ((this as { $refs: { card: HTMLElement } }).$refs.card)
        (this as { $refs: { card: HTMLElement } }).$refs.card.classList.toggle(
          "flip"
        );
    },
    setContent(this: {
      content: CardContent;
      cardContent: CardContent;
      $refs: {
        text: HTMLParagraphElement;
        image: HTMLImageElement;
      };
    }) {
      if (this.cardContent.type === "text") {
        if (this.$refs.text) {
          this.$refs.text.style.display = "block";
        }
      }
      if (this.cardContent.type === "image") {
        if (this.$refs.image) {
          this.$refs.image.src = this.cardContent.content;
          this.$refs.image.style.display = "block";
        }
      }
    },
    openModal(this: { showModal: boolean }) {
      this.showModal = true;
    },

    closeModal(this: any) {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.MemoryCard {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: scale(1);
  margin: 5px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}
.MemoryCard:active {
  transform: scale(0.95);
  transition: transform 0.25s;
}
.MemoryCard.flip {
  transform: rotateY(180deg);
}
.front,
.back {
  width: 100%;
  height: 100%;
  background: lightskyblue;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  overflow: auto;
}
.back {
  transform: rotateY(180deg);
}

#text {
  width: calc(100% - 5px);
  display: none;
  margin: auto;
}

#image {
  display: none;
}

#modaltext,
#modalimage {
  display: none;
}

#detailView {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  background: grey;
  top: 85%;
  left: 5%;
  border-radius: 30%;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back img {
  width: 100%;
  height: 100%;
}
</style>
