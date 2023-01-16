<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
  <div class="modal-backdrop" v-show="isOpen" @click="close"></div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "ContentModal",
  setup() {
    const isOpen = ref(false);

    function open() {
      isOpen.value = true;
    }

    function close() {
      isOpen.value = false;
    }

    return {
      isOpen,
      open,
      close,
    };
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
