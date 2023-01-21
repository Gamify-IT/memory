<template>
  <div class="modal">
    <div class="modal-content" @click.stop>
      <p id="modalText" v-if="!isImage">
        {{ cardContent.content }}
      </p>
      <img
        alt="image"
        id="modalImage"
        :src="cardContent.content"
        class="img-responsive"
        v-if="isImage"
      />
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
  data() {
    return {
      isImage: false,
    };
  },
  mounted(this: { setContent: () => void }) {
    this.setContent();
  },

  methods: {
    setContent(this: { cardContent: CardContent; isImage: boolean }) {
      this.isImage = this.cardContent.type === "image";
    },
  },
};
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
