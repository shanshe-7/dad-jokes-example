import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

function useCreateForm() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const answer = ref("");
  const question = ref("");

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => axios.post(`http://localhost:3000/jokes`, data),
    onSuccess: () => {
      router.push("/");
      answer.value = "";
      question.value = "";
      return queryClient.invalidateQueries(["jokes"]);
    },
  });

  function submitHandler(e) {
    e.preventDefault();
    if (!answer.value || !question.value) return;

    const data = {
      id: uuidv4(),
      answer: answer.value,
      question: question.value,
    };
    mutate(data);
  }

  return { submitHandler, answer, question, isLoading };
}
export { useCreateForm };
