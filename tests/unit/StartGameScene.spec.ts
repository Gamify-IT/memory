import StartGameScene from "@/components/StartGameScene.vue";
import { mount } from "@vue/test-utils";
import router from "@/router/index";

describe("StartGameScreen.vue", () => {
  test("correct route to Singleplayer", async () => {
    const push = jest.spyOn(router, "push");
    const wrapper = mount(StartGameScene, {
      global: {
        plugins: [router],
        mocks: {
          clickSound: {
            play: jest.fn(),
          },
        },
      },
    });
    router.push("/singleplayer");
    await router.isReady();
    await wrapper.find("button").trigger("click");
    expect(push).toHaveBeenCalledWith("/singleplayer");
  });
});
