<template>
  <div class="modal">
    <div class="modalContent" @click.stop>
      <p id="modalText" v-if="!isImage">
        {{ cardContent.content }}
      </p>
      <img
        alt="image"
        id="modalImage"
        :src="cardContent.content"
        class="imgResponsive"
        v-if="isImage"
      />
      <slot></slot>
    </div>
    <div class="modalBackdrop"></div>
  </div>
</template>

<script setup lang="ts">
import { CardContent } from "@/types/DataModels";
import { defineProps, ref, PropType } from "vue";

const props = defineProps({
  cardContent: {
    type: Object as PropType<CardContent>,
    required: true,
  },
});

const isImage = ref(props.cardContent.type == "image");
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

.imgResponsive {
  width: 100%;
}

.modalContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
  padding: 1rem;
  z-index: 999;
}

.modalBackdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
