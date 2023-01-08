<template>
  <div id="container">
    <div class="cardContainer"></div>
    <div class="cardContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "PairItem",
  components: {},
  props: {
    text: String,
  },
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 200px;
  background-color: rgb(53, 53, 53);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}
.cardContainer {
  background: rgb(184, 184, 184);
  width: 180px;
  height: 180px;
}
</style>
