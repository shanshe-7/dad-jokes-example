<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <div class="wrapper">
    <nav>
      <Header />
    </nav>

    <div><router-view /></div>
  </div>
</template>

<style scoped>
.wrapper {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
  max-width: 800px;
}
</style>
