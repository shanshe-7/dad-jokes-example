<script setup>
import JokeForm from "./EditForm.vue";
import axios from "axios";

import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { sleep } from "../composables/useGetJokes";
const route = useRoute();

async function getJoke({ queryKey }) {
  await sleep(500);
  return axios.get(`http://localhost:3000/jokes/${queryKey[1]?.id}`);
}

const {
  data: joke,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["jokes", { id: route.params.jokeId }],
  queryFn: getJoke,
  select: (resp) => resp.data,
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="isError">Error</div>

  <div v-if="joke">
    <div>
      <h2>Joke</h2>
      <div class="joke-display">
        <span>Question:</span>
        <p>{{ joke.question }}</p>
      </div>

      <div class="joke-display">
        <span>Answer:</span>
        <p>{{ joke.answer }}</p>
      </div>

      <JokeForm :question="joke.question" :answer="joke.answer" />
    </div>
  </div>
</template>

<style scoped>
.joke-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

span {
  text-transform: uppercase;
  font-weight: bold;

  width: 7rem;
  display: flex;
}
.loading {
  opacity: 0.5;
}
</style>
