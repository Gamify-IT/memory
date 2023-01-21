<template>
  <div
    class="memory-card"
    @click.stop="revealCard"
    :class="{
      showCursor: canFlip,
      flip: cardContent.flipped || initiallyRevealed,
      noEvents: !canFlip,
    }"
  >
    <div class="front"></div>
    <div class="back">
      <p id="text" v-if="!isImage">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="image" :src="cardContent.content" v-if="isImage" />
    </div>
  </div>
</template>

<script lang="ts">
//      noEvents: !test,
import { defineComponent, PropType } from "vue";
import { CardData, CardType } from "../types/data-models";
export default defineComponent({
  name: "MemoryCard",
  props: {
    cardContent: {
      type: Object as PropType<CardData>,
      required: true,
    },
    canFlip: Boolean,
    initiallyRevealed: Boolean,
  },

  data() {
    return {
      isImage: this.cardContent.type == CardType.IMAGE,
      test: this.canFlip,
    };
  },

  watch: {
    canFlip(newValue: boolean) {
      if (newValue == true && this.cardContent.flipped) {
        this.$emit("cardHide", this.cardContent);
      }
      this.test = newValue;
    },
  },

  methods: {
    revealCard() {
      if (this.canFlip && !this.cardContent.flipped) {
        this.$emit("cardReveal", this.cardContent);
      }
    },
  },
});
</script>

<style scoped>
.memory-card {
  width: 100%;
  height: 100%;

  transform: scale(1);
  margin: 5px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.showCursor {
  cursor: pointer;
}
.flip {
  transform: rotateY(180deg);
}
.noEvents {
  pointer-events: none;
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
  margin: auto;
}

.back img {
  width: 100%;
  height: 100%;
}
</style>
