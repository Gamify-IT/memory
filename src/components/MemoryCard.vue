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
const emit = defineEmits(["cardReveal", "cardHide"]);

const isImage = ref(props.cardContent.type == CardType.IMAGE);

function revealCard() {
  if (props.canFlip && !props.cardContent.flipped) {
    emit("cardReveal", props.cardContent);
  }
}

watch(
  () => props.canFlip,
  (newValue) => {
    if (newValue == true && props.cardContent.flipped) {
      emit("cardHide", props.cardContent);
    }
  }
);
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
