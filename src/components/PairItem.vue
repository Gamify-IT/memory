<template>
  <div id="container">
    <div class="cardContainer">
      <MemoryCard :cardContent="cardContent1" />
    </div>
    <div class="cardContainer"><MemoryCard :cardContent="cardContent2" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MemoryCard from "./MemoryCard.vue";
import CardContent from "../Types/CardContent";
export default defineComponent({
  name: "PairItem",
  components: { MemoryCard },
  data() {
    return {
      cardContent1: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
        type: "text",
        id: 0,
        pairid: 0,
      } as CardContent,
      cardContent2: {
        content:
          "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
        type: "image",
        id: 0,
        pairid: 0,
      } as CardContent,
    };
  },
  props: {
    text: String,
  },
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 30%;
  background-color: rgb(125, 125, 125);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}
.cardContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(125, 125, 125);
  width: 45%;
  height: 90%;
}
</style>
