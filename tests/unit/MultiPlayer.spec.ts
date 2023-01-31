import MultiPlayer from "@/components/MultiPlayer.vue";
import { mount } from "@vue/test-utils";
import router from "@/router/index";
beforeEach(async () => {
  router.push("/");
  await router.isReady();
});

test("button redirects to correct page", async () => {
  const wrapper = mount(MultiPlayer, {
    global: {
      plugins: [router],
    },
  });
  const push = jest.spyOn(router, "push");
  await wrapper.find("button").trigger("click");
  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith({path: "/"});
});
