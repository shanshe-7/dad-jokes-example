import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import router from "./router";

import { VueQueryPlugin } from "@tanstack/vue-query";

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { retry: 0 } },
  },
};

createApp(App)
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount("#app");
