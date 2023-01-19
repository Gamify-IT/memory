<template>
  <h1>Memory</h1>
  <button class="button" style="vertical align:middle">
    <span>Start Game</span>
  </button>
</template>

<style scoped>
h1 {
  color: black;
  font-size: 100%;
  align-content: center;
}

.button {
  display: inline-block;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: #000000;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 300px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: lightgray;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  perspective: 1000px;
}
</style>
