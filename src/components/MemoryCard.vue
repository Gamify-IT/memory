<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardType } from "../types/DataModels";
export default defineComponent({
  props: {
    cardContent: {
      type: Object as PropType<CardData>,
      required: true,
    },
    index: Number,
    canTurn: Boolean,
    initiallyRevealed: Boolean,
  },
  data() {
    return {
      turnedOver: false,
      cardRotation: 180,
      revealedClass: {
        transform: "rotate(180deg)",
      },
    };
  },
  watch: {
    canTurn(newValue: boolean) {
      if (newValue == true && this.turnedOver) {
        this.flipCard();
      }
    },
  },
  mounted(this: {
    setContent: () => void;
    flipCard: () => void;
    $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
    initiallyRevealed: boolean;
  }) {
    this.setContent();
    if (this.initiallyRevealed == true) {
      this.flipCard();
    }
  },
  methods: {
    revealCard(this: any) {
      if (
        (this as { $refs: { card: HTMLElement } }).$refs.card &&
        this.canTurn &&
        !this.turnedOver
      ) {
        (this as { $refs: { card: HTMLElement } }).$refs.card.classList.toggle(
          "flip"
        );
        this.turnedOver = !this.turnedOver;
        this.$emit("cardToggle", this.index);
      }
    },
    flipCard(this: any) {
      if ((this as { $refs: { card: HTMLElement } }).$refs.card) {
        (this as { $refs: { card: HTMLElement } }).$refs.card.classList.toggle(
          "flip"
        );
        this.turnedOver = !this.turnedOver;
      }
    },
    setContent(this: {
      content: CardData;
      cardContent: CardData;
      $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
    }) {
      if (this.cardContent.type === CardType.TEXT) {
        if (this.$refs.text) {
          this.$refs.text.style.display = "block";
        }
      }
      if (this.cardContent.type == CardType.IMAGE) {
        if (this.$refs.image) {
          this.$refs.image.src = this.cardContent.content;
          this.$refs.image.style.display = "block";
        }
      }
    },
  },
});
</script>

<template>
  <div
    class="MemoryCard"
    id="card"
    ref="card"
    @click="revealCard"
    :style="{ transform: 'rotate(${deg}deg)' }"
  >
    <div class="front"></div>
    <div class="back">
      <p id="text" ref="text">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="image" ref="image" />
    </div>
  </div>
</template>

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
/*
.MemoryCard:active {
  transform: scale(0.95);
  transition: transform 0.25s;
}*/
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

.back img {
  width: 100%;
  height: 100%;
}
</style>
