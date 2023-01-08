<template>
  <div id="panel" class="gloss">
    <div id="gridContainer">
      <div class="gridCell" v-for="(pair, index) in pairs" :key="index"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePanel",
  components: {},
  data() {
    return {
      pairs: Array.from(Array<string>(12).keys()),
      w: 10,
    };
  },
});
</script>

<style scoped>
#panel {
  width: 100%;
  height: 100%;
}
#gridContainer {
  display: grid;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, auto);
}
.gridCell {
  background-color: rgba(172, 172, 172, 0.544);
  margin: 10px;
  height: 30%;
}
</style>
