<template>
  <div class="modal">
    <div class="modal-content" @click.stop>
      <p id="modalText" ref="modalText">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="modalImage" ref="modalImage" />
      <slot></slot>
    </div>
    <div class="modal-backdrop"></div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { CardContent } from "../types/DataModels";
export default {
  name: "ContentModal",
  props: {
    cardContent: {
      type: Object as PropType<CardContent>,
      required: true,
    },
  },
  mounted(this: {
    setContent: () => void;
    $refs: { modalText: HTMLParagraphElement; modalImage: HTMLImageElement };
  }) {
    this.setContent();
  },
  methods: {
    setContent(this: {
      content: CardContent;
      cardContent: CardContent;
      $refs: {
        modalText: HTMLParagraphElement;
        modalImage: HTMLImageElement;
      };
    }) {
      console.log(this.cardContent.type);
      if (this.cardContent.type === "text") {
        if (this.$refs.modalText) {
          console.log("here");
          this.$refs.modalText.style.display = "block";
        }
      }
      if (this.cardContent.type === "image") {
        if (this.$refs.modalImage) {
          this.$refs.modalImage.src = this.cardContent.content;
          this.$refs.modalImage.style.display = "block";
        }
      }
    },
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  margin: -3.15%;
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

#modalText {
  display: none;
}

#modalImage {
  display: none;
}
</style>
