<template>
  <div id="panel" class="gloss">
    <div id="gridContainer">
      <div v-for="card in cardContent" :key="card.id">
        <MemoryCard :cardContent="card" />
      </div>
      <!--<div><MemoryCard :cardContent="cardContent" /></div>-->
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
  //"@/assets/images/ghost.jpg",
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
#panel {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
#gridContainer {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 24.5%);
  grid-template-rows: repeat(3, 32.5%);
  gap: 5px;
}
</style>
