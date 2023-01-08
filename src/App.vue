<template>
  <div id="MemoryBox"></div>
  <div id="PairBox"></div>
  <div class="center">
    <div class="app"><HeaderWebsite /></div>
    <button onclick="startGame()" class="button button1">Start Game</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderWebsite from "@/components/HeaderWebsite.vue";
export default defineComponent({
  name: "App",
  components: { HeaderWebsite },
});

//const whiteBox = document.querySelector("Button");
//whiteBox.addEventListener("click", function () {
//const whiteMemoryBox = document.getElementById("MemoryBox");
//whiteMemoryBox!.style.borderColor = "white";
//});
document.getElementById("MemoryBox")?.style;

function startGame() {
  document.getElementById("MemoryBox")!.style.borderColor = "white";
}
</script>
