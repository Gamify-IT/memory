<template>
  <!-- Memory Card Component -->
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
    <!-- Front side of the card -->
    <div class="front"></div>
    <!-- Back side of the card, revealed when flipped -->
    <div class="back">
      <div id="content">
        <div id="text" v-if="isText">
          {{ cardContent.content }}
        </div>
        <!-- Display image if card type is 'IMAGE' -->
        <img
          alt="image not available"
          id="image"
          :src="cardContent.content"
          v-else-if="isImage"
          draggable="false"
        />
        <!-- Render Markdown if card type is 'MARKDOWN' -->
        <div
          id="markdown"
          v-else-if="isMarkdown"
          v-html="markdownContent"
        ></div>
      </div>
      <!-- Button to open the modal with detailed content -->
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
import clickSoundSource from "@/assets/music/click_sound.mp3";
import { MemoryController } from "@/types/memory-controller";

const memoryController = new MemoryController();
let clickSound: HTMLAudioElement;

/**
 * onMounted lifecycle hook to fetch data and initialize audio
 */
onMounted(async () => {
  await memoryController.fetchData();
  clickSound = memoryController.createAudioWithVolume(clickSoundSource);
});
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

/**
 * Function to reveal a card when clicked
 */
function revealCard() {
  if (props.canFlip && !props.cardContent.flipped) {
    emit("cardReveal", props.cardContent);
  }
}

/**
 * Configure the Markdown renderer to include KaTeX support
 */
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

/**
 * Function to open a modal when the button on the card is clicked
 */
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

/**
 * Function to play the click sound
 */
function playClickSound() {
  clickSound.play();
}
</script>
<style scoped>
/* Basic style for the memory card */
.memory-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: scale(1);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

/* Styling for unselected cards */
.card-unselected {
  border: 2px solid #949494;
}

/* Styling for matched cards */
.card-match {
  border: 2px solid #009e0d;
}

/* Styling for mismatched cards */
.card-mismatch {
  border: 2px solid #950000;
}

/* Shows cursor pointer when card is clickable */
.show-cursor {
  cursor: pointer;
}

/* Applies flip effect to the card */
.flip {
  transform: rotateY(180deg);
}

/* Prevents interaction with the card when 'no-events' class is applied */
.no-events {
  pointer-events: none;
}

/* Styles for the back of the card */
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

/* Styles for the front side of the card */
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

/* Container for content inside the back of the card */
#content {
  height: 100%;
  overflow: auto;
}

/* Styling for text content inside the card */
#text {
  padding: 5px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
}

/* Button to open detailed view in modal */
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

/* Styling for images on the back of the card */
.back img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
