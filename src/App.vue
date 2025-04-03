<script setup>
import TextRender from "@/components/gameRenders/TextRender.vue";
</script>

<template>
  <header id="main-title">
    <h1 class="font-bold underline">
      Tetris Vue.js
    </h1>
  </header>

  <main>
    <TextRender/>
  </main>
</template>

<style scoped>
header#main-title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: Arial,serif;
  font-size: 23pt;
}
</style>
