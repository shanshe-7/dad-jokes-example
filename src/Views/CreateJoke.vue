<script setup>
import { useCreateForm } from "../composables/useCreateForm";

const { question, answer, submitHandler } = useCreateForm();
</script>

<template>
  <div>
    <h2>New</h2>
    <form v-on:submit="submitHandler">
      <div class="form-wrapper">
        <label>
          <span> Question</span>

          <input v-model="question" type="text" name="question" id="question" />
        </label>
        <label>
          <span> Answer</span>
          <input v-model="answer" name="answer" id="answer" />
        </label>
        <div class="form-button">
          <button type="submit">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

input {
  height: 3rem;
  padding: 0 1rem;
  width: 60%;
}
span {
  width: 30%;
}

.form-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
