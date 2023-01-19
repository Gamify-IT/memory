import { createRouter, createWebHistory } from "vue-router";
import startScreen from "../views/startScreen.vue";
import loadingScreen from "../views/loadingScreen.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: startScreen,
    },
    {
      path: "/loading",
      component: loadingScreen,
    },
  ],
});
export default router;
