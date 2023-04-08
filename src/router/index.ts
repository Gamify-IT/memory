import { createRouter, createWebHistory } from "vue-router";
import StartGameScene from "../components/StartGameScene.vue";
import GamePanel from "../components/GamePanel.vue";
import MultiPlayer from "../components/MultiPlayer.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
      component: MultiPlayer,
    },
  ],
});
export default router;
