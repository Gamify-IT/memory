<template>
  <!-- Main modal container, holds modal content and backdrop -->
  <div class="modal">
    <div class="modal-content" @click.stop>
      <!-- Text is displayed if the card type is TEXT -->
      <p id="modal-text" v-if="isText">
        {{ cardData.content }}
      </p>
      <!-- Image is displayed if the card type is IMAGE -->
      <img
        alt="image"
        id="modal-image"
        :src="cardData.content"
        class="img-responsive"
        v-else-if="isImage"
      />
      <!-- Markdown content is displayed if the card type is MARKDOWN -->
      <div id="markdown" v-else-if="isMarkdown" v-html="markdownContent"></div>
      <!-- Slot for custom content passed to the modal -->
      <slot></slot>
    </div>
    <div class="modal-backdrop"></div>
  </div>
</template>

<script setup lang="ts">
import { CardData, CardType } from "@/types/data-models";
import { ref, PropType, computed, onMounted } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";

// Define props for the card data passed to the modal component
const props = defineProps({
  cardData: {
    type: Object as PropType<CardData>,
    required: true,
  },
});

// Reactive variables to check the card type (Image, Text, or Markdown)
const isImage = ref(props.cardData.type == CardType.IMAGE);
const isText = ref(props.cardData.type == CardType.TEXT);
const isMarkdown = ref(props.cardData.type == CardType.MARKDOWN);

// Compute the markdown content by parsing it using the `marked` library
const markdownContent = computed(() => marked(props.cardData.content));

// Run onMounted hook to initialize syntax highlighting when the component is mounted
onMounted(() => {
  hljs.initHighlightingOnLoad();
});
</script>

<style>
/* Style for the modal overlay (background) */
.modal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Style for the responsive image */
.img-responsive {
  width: 100%;
}

/* Style for modal content, centered on the screen */
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
  padding: 1rem;
  z-index: 999;
}

/* Style for the modal backdrop (the darkened background behind the modal) */
.modal-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
