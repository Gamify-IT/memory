<script lang="ts">
//import { PropType } from "vue";
//import CardContent from "@/Types/CardContent";
export default {
  mounted(this: {
    setContent: () => void;
    $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
  }) {
    this.setContent();
  },
  /*  props: {
    contents: {
      required: true,
      content: "text",
      id:-1,
      pairid:-1,
      type: Array as PropType<CardContent[]>,
    }
  },*/
  data() {
    return {
      content: "text",
    };
  },
  methods: {
    flipCard(this: any) {
      if ((this as { $refs: { card: HTMLElement } }).$refs.card)
        (this as { $refs: { card: HTMLElement } }).$refs.card.classList.toggle(
          "flip"
        );
    },
    setContent(this: {
      content: string;
      $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
    }) {
      console.log("here");
      if (this.content === "text") {
        if (this.$refs.text) this.$refs.text.style.display = "block";
      }
      if (this.content === "image") {
        if (this.$refs.image) this.$refs.image.style.display = "block";
      }
    },
  },
};
</script>

<template>
  <div class="MemoryCard" id="card" ref="card" @click="flipCard()">
    <div class="front">front</div>
    <div class="back">
      <p id="text" ref="text">text</p>
      <img src="@/assets/images/ghost.jpg" alt="image" id="image" ref="image" />
    </div>
  </div>
</template>

<style scoped>
.MemoryCard {
  width: 100px; /*calc(25%-10px)*/
  height: 100px; /*calc(25%-10px)*/
  cursor: pointer;
  transform: scale(1);
  margin: 5px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}
.MemoryCard:active {
  transform: scale(0.95);
  transition: transform 0.25s;
}
.MemoryCard.flip {
  transform: rotateY(180deg);
}
.front,
.back {
  width: 100%;
  height: 100%;
  background: lightblue;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
}
.back {
  transform: rotateY(180deg);
}

#text {
  display: none;
}

#image {
  display: none;
}

.back img {
  width: 100%;
  height: auto;
}
</style>
