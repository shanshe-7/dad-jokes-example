<script setup></script>

<template>
  <div class="navigation">
    <router-link to="/">Home</router-link>

    <div class="new-and-count">
      <router-link :to="{ name: 'createJoke' }"><span>New</span></router-link>
      <!-- <p>total-jokes: {{ data }}</p> -->
    </div>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  height: 4rem;
}

.new-and-count {
  display: flex;

  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
p {
  text-transform: uppercase;
}
</style>
