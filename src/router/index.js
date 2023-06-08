import { createRouter, createWebHistory } from "vue-router";

import Jokes from "../Views/Jokes.vue";
import Joke from "../Views/Joke.vue";
import CreateJoke from "../Views/CreateJoke.vue";

const routes = [
  {
    path: "/",
    name: "jokes",
    component: Jokes,
  },
  {
    path: "/jokes/:jokeId",
    name: "joke",
    component: Joke,
  },

  {
    path: "/new",
    name: "createJoke",
    component: CreateJoke,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
