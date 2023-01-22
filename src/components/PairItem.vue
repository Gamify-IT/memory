<template>
  <div id="container">
    <div class="cardContainer">
      <MemoryCard
        :cardContent="cardContent1"
        @openModal="$emit('openModal', cardContent1)"
      />
    </div>
    <div class="cardContainer">
      <MemoryCard
        :cardContent="cardContent2"
        @openModal="$emit('openModal', cardContent2)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MemoryCard from "./MemoryCard.vue";
import { CardContent } from "../types/DataModels";
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
  background-color: rgb(186, 186, 186);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}
.cardContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 45%;
  height: 90%;
}
</style>
