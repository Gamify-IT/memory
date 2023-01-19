import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/global.css";
import router from "./router";
createApp(App).use(store).mount("#app");
createApp(App).use(router).mount("#app");
