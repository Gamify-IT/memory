<script lang="ts">
export default {
  props: ["text"],
  name: "MemoryCard",
  setup(props) {
    console.log(props.text);
  },
};
</script>

<template>
  <p>{{ text }}</p>
</template>
<style scoped>
#MemoryCard {
  width: 400px;
  height: 100px;
}
</style>
