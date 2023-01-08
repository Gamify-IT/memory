<script lang="ts">
import { PropType } from "vue";
import CardContent from "@/Types/CardContent";
export default {
  /*  data(): { content: CardContent } {
    return {
      content: this.cardContent as CardContent,
    };
  },*/
  props: {
    cardContent: {
      type: Object as PropType<CardContent>,
      required: true,
    },
  },
  mounted(this: {
    setContent: () => void;
    $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
  }) {
    this.setContent();
  },
  methods: {
    flipCard(this: any) {
      if ((this as { $refs: { card: HTMLElement } }).$refs.card)
        (this as { $refs: { card: HTMLElement } }).$refs.card.classList.toggle(
          "flip"
        );
    },
    setContent(this: {
      content: CardContent;
      cardContent: CardContent;
      $refs: { text: HTMLParagraphElement; image: HTMLImageElement };
    }) {
      if (this.cardContent.type === "text") {
        if (this.$refs.text) {
          this.$refs.text.style.display = "block";
        }
      }
      if (this.cardContent.type === "image") {
        if (this.$refs.image) {
          this.$refs.image.src = this.cardContent.content;
          this.$refs.image.style.display = "block";
        }
      }
    },
  },
};
</script>

<template>
  <div class="MemoryCard" id="card" ref="card" @click="flipCard()">
    <div class="front">front</div>
    <div class="back">
      <p id="text" ref="text">
        {{ cardContent.content }}
      </p>
      <img alt="image" id="image" ref="image" />
      <!--"@/assets/images/ghost.jpg"-->
    </div>
  </div>
</template>

<style scoped>
.MemoryCard {
  width: 100%; /*calc(25%-10px)*/
  height: 100%; /*calc(25%-10px)*/
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
  overflow: auto;
}
.back {
  transform: rotateY(180deg);
}

#text {
  width: calc(100% - 5px);
  display: none;
  margin: auto;
}

#image {
  display: none;
}

.back img {
  width: 100%;
  height: 100%;
}
</style>
