<template>
  <div class="modal">
    <div class="modalContent" @click.stop>
      <p id="modalText" v-if="!isImage">
        {{ cardData.content }}
      </p>
      <img
        alt="image"
        id="modalImage"
        :src="cardData.content"
        class="imgResponsive"
        v-if="isImage"
      />
      <slot></slot>
    </div>
    <div class="modalBackdrop"></div>
  </div>
</template>

<script setup lang="ts">
import { CardData, CardType } from "@/types/data-models";
import { defineProps, ref, PropType } from "vue";

const props = defineProps({
  cardData: {
    type: Object as PropType<CardData>,
    required: true,
  },
});

const isImage = ref(props.cardData.type == CardType.IMAGE);
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
