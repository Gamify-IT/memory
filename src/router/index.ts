import { createRouter, createWebHistory } from "vue-router";
import StartGameScene from "../components/StartGameScene.vue";
import GamePanel from "../components/GamePanel.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: StartGameScene,
    },
    {
      path: "/singleplayer",
      component: GamePanel,
    },
    {
      path: "/multiplayer",
      component: GamePanel,
    },
  ],
});
export default router;
