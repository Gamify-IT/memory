<template>
  <div
    class="memory-card"
    @click.stop="revealCard"
    :class="{
      'show-cursor': canFlip,
      flip: cardContent.flipped || initiallyRevealed,
      'no-events': !canFlip,
      'card-match': cardContent.selection == CardSelection.MATCH,
      'card-mismatch': cardContent.selection == CardSelection.MISMATCH,
      'card-unselected': cardContent.selection == CardSelection.UNSELECTED,
    }"
  >
    <div class="front"></div>
    <div class="back">
      <div id="content">
        <div id="text" v-if="isText">
          {{ cardContent.content }}
        </div>
        <img
          alt="image not available"
          id="image"
          :src="cardContent.content"
          v-else-if="isImage"
          draggable="false"
        />
        <div
          id="markdown"
          v-else-if="isMarkdown"
          v-html="markdownContent"
        ></div>
      </div>
      <button id="detail-view" @click.stop="openModal">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, computed, onMounted } from "vue";
import katex from "katex";
import markedKatex from "marked-katex-extension";
import { CardData, CardType, CardSelection } from "@/types/data-models";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";
import "katex/dist/katex.min.css";
import clickSoundSource from "@/assets/music/click.mp3";

const clickSound = new Audio(clickSoundSource);
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
const isText = ref(props.cardContent.type == CardType.TEXT);
const isMarkdown = ref(props.cardContent.type == CardType.MARKDOWN);

function revealCard() {
  if (props.canFlip && !props.cardContent.flipped) {
    emit("cardReveal", props.cardContent);
  }
}

marked.use(
  markedKatex({
    renderer: new marked.Renderer(),
    breaks: true,
    gfm: true,
    math: true,
    render: {
      math: (math: string) =>
        katex.renderToString(math, { throwOnError: false }),
    },
  })
);

const markdownContent = computed(() => marked(props.cardContent.content));

onMounted(() => {
  hljs.initHighlightingOnLoad();
});

function openModal() {
  emit("openModal", props.cardContent);
  playClickSound();
}

watch(
  () => props.canFlip,
  (newValue) => {
    if (newValue && props.cardContent.flipped) {
      emit("cardHide", props.cardContent);
    }
  }
);

function playClickSound(){
  clickSound.play();
}
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
}
.card-unselected {
  border: 2px solid #949494;
}
.card-match {
  border: 2px solid #009e0d;
}
.card-mismatch {
  border: 2px solid #950000;
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
  transform: rotateY(180deg);
  pointer-events: all;
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
#content {
  height: 100%;
  overflow: auto;
}
#text {
  padding: 5px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
}

#detail-view {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 30%;
  background: grey;
  bottom: 5%;
  left: 5%;
  color: white;
  font-size: 25px;
}
.back img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
