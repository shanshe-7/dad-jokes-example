<script setup>
import Pagination from "../components/Pagination.vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";

import axios from "axios";
import { sleep, useGetJokes } from "../composables/useGetJokes";

const { data, isLoading, isPreviousData } = useGetJokes((res) => {
  return { jokes: res.data, total: res.headers?.get("X-Total-Count") };
});

const queryClient = useQueryClient();

const { mutate: deleteJoke, isLoading: isDeleting } = useMutation({
  mutationFn: async (data) => {
    await sleep(500);
    return axios.delete(`http://localhost:3000/jokes/${data?.id}`);
  },
  onSettled: () => {
    return queryClient.invalidateQueries({
      queryKey: ["jokes"],
    });
  },
});

function preFill(joke) {
  return queryClient.setQueryData(["jokes", { id: joke.id }], { data: joke });
}
</script>

<template>
  <div v-if="isLoading">loading...</div>

  <div class="jokes-wrapper" v-if="data">
    <h2>JOKES</h2>

    <div class="jokes">
      <div class="link-and-delete" v-for="joke in data.jokes" :key="joke.id">
        <router-link
          :to="{
            name: 'joke',
            params: { jokeId: joke.id },
          }"
          ><div
            v-on:mouseenter="preFill(joke)"
            :class="{ previousData: !!isPreviousData }"
          >
            {{ joke.question }}
          </div></router-link
        >
        <button
          :key="joke.id"
          :disabled="isDeleting"
          v-on:click="deleteJoke({ id: joke.id })"
        >
          delete
        </button>
      </div>
    </div>
    <Pagination :total="data.total" />
  </div>
</template>

<style scoped>
.jokes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jokes {
  border: 0.1px solid black;
  border-radius: 8px;
  height: 16rem;
  display: flex;

  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
.link-and-delete {
  display: flex;
  justify-content: space-between;

  align-items: center;
  gap: 0.5rem;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.previousData {
  opacity: 0.6;
}

label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

input {
  height: 3rem;
  padding: 0 1rem;
  width: 500px;
}
</style>
