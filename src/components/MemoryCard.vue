<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {
    flipCard() {
      let x: HTMLElement | null = document.getElementById("card"); //<HTMLDivElement>this.$refs.card;
      if (x != null) x.classList.toggle("flip");
    },
  },
};
</script>

<template>
  <div class="MemoryCard" id="card" @click="flipCard()">
    <div class="front">front</div>
    <div class="back">back</div>
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
  background: grey;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
}
.front {
  transform: rotateY(180deg);
}
</style>
