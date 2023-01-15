<template>
  <div id="gridContainer" class="gloss">
    <div v-for="card in cardContent" :key="card.id">
      <MemoryCard :cardContent="card" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MemoryCard from "./MemoryCard.vue";
import CardContent from "../Types/CardContent";
export default defineComponent({
  name: "GamePanel",
  components: { MemoryCard },
  data() {
    return {
      pairs: Array.from(Array<string>(12).keys()),
      w: 10,
      cardContent: [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
          type: "text",
          id: 0,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 1,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 2, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 3,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 4, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 5,
          pairid: 0,
        } as CardContent,
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
          type: "text",
          id: 6,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 7,
          pairid: 0,
        } as CardContent,
        { content: "some text", type: "text", id: 8, pairid: 0 } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 9,
          pairid: 0,
        } as CardContent,
        {
          content: "some text",
          type: "text",
          id: 10,
          pairid: 0,
        } as CardContent,
        {
          content:
            "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
          type: "image",
          id: 11,
          pairid: 0,
        } as CardContent,
      ],
    };
  },
});
</script>

<style scoped>
#gridContainer {
  display: grid;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, calc(24.9% - 5px));
  grid-template-rows: repeat(3, calc(33.2% - 5px));
  gap: 5px;
}
</style>
