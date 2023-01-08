<template>
  <div id="panel" class="gloss">
    <div id="heading">Summary</div>
    <div id="scrollbar">
      <PairItem
        v-for="(pair, index) in pairs"
        :key="index"
        :text="pair.toString()"
        class="pairItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PairItem from "./PairItem.vue";

export default defineComponent({
  name: "SummaryPanel",
  components: { PairItem },
  data() {
    return {
      pairs: ["1", "2", "3", "3", "3", "3", "3", "3"],
    };
  },
});
</script>

<style scoped>
#panel {
  width: 100%;
  height: 100%;
}
#heading {
  padding: 16px;
  font-size: 2em;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  border-bottom: 3px solid rgb(52, 52, 52);
}
#scrollbar {
  margin: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 700px;
}
</style>
