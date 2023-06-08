<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const props = defineProps(["question", "answer"]);
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { sleep } from "../composables/useGetJokes";

const queryClient = useQueryClient();

const route = useRoute();

const question = ref(props.question);
const answer = ref(props.answer);

const { mutate: edit, isLoading } = useMutation({
  onMutate: (data) => {
    queryClient.setQueryData(["jokes", { id: data.id }], { data });
  },
  mutationFn: async (data) => {
    await sleep(1000);
    return axios.patch(`http://localhost:3000/jokes/${data?.id}`, data);
  },

  onSettled: () => {
    return queryClient.invalidateQueries({
      queryKey: ["jokes"],
    });
  },
});

function submitHandler(e) {
  e.preventDefault();
  edit({
    id: route.params.jokeId,
    answer: answer.value,
    question: question.value,
  });
}
</script>

<template>
  <form v-on:submit="submitHandler">
    <div class="form-wrapper">
      <label>
        <input v-model="question" type="text" name="question" id="question" />
      </label>
      <label>
        <input v-model="answer" type="text" name="answer" id="answer" />
      </label>
      <div class="edit-button">
        <button :disabled="isLoading" type="submit">Edit</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
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
  /* border-radius: 5px; */
}

button {
  width: 10rem;
}
</style>
