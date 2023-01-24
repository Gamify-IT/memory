<template>
  <div
    class="memory-card"
    @click.stop="revealCard"
    :class="{
      'show-cursor': canFlip,
      flip: cardContent.flipped || initiallyRevealed,
      'no-events': !canFlip,
    }"
  >
    <div class="front"></div>
    <div class="back">
      <p id="text" v-if="!isImage">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="image" :src="cardContent.content" v-if="isImage" />
      <button id="detail-view" @click.stop="openModal">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { CardData, CardType } from "../types/data-models";

const props = defineProps({
  cardContent: {
    type: Object as PropType<CardData>,
    required: true,
  },
  canFlip: Boolean,
  initiallyRevealed: Boolean,
});
const emit = defineEmits(["cardReveal", "cardHide", "openModal"]);

const isImage = ref(props.cardContent.type == CardType.IMAGE);

function revealCard() {
  if (props.canFlip && !props.cardContent.flipped) {
    emit("cardReveal", props.cardContent);
  }
}

function openModal() {
  emit("openModal", props.cardContent);
}

watch(
  () => props.canFlip,
  (newValue) => {
    if (newValue && props.cardContent.flipped) {
      emit("cardHide", props.cardContent);
    }
  }
);
</script>

<style scoped>
.memory-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: scale(1);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  border: 2px solid #949494;
}

.show-cursor {
  cursor: pointer;
}
.flip {
  transform: rotateY(180deg);
}
.no-events {
  pointer-events: none;
}

.back {
  width: 100%;
  height: 100%;
  background: rgb(250, 250, 250);
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  overflow: auto;
  transform: rotateY(180deg);
}

.front {
  width: 100%;
  height: 100%;
  background-color: #e4e4e4;
  background-image: url("../assets/images/circuit-board.svg");
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  background-size: cover;
}

#text {
  width: calc(100% - 5px);
  margin: auto;
}

#detail-view {
  position: fixed;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  background: grey;
  bottom: 5%;
  left: 5%;
  border-radius: 30%;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: all;
}
.back img {
  width: 100%;
  height: 100%;
}
</style>
