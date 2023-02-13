<template>
  <div class="modal">
    <div class="modal-content" @click.stop>
      <p id="modal-text" v-if="isText">
        {{ cardData.content }}
      </p>
      <img
        alt="image"
        id="modal-image"
        :src="cardData.content"
        class="img-responsive"
        v-else-if="isImage"
      />
      <div id="markdown" v-else-if="isMarkdown" v-html="markdownContent"></div>
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
import "highlight.js/styles/vs2015.css";

const props = defineProps({
  cardData: {
    type: Object as PropType<CardData>,
    required: true,
  },
});

const isImage = ref(props.cardData.type == CardType.IMAGE);
const isText = ref(props.cardData.type == CardType.TEXT);
const isMarkdown = ref(props.cardData.type == CardType.MARKDOWN);

const markdownContent = computed(() => marked(props.cardData.content));

onMounted(() => {
  hljs.initHighlightingOnLoad();
});
</script>

<style>
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

.img-responsive {
  width: 100%;
}

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

.modal-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
