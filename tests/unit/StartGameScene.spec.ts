import StartGameScene from "./../src/components/StartGameScene.vue";
import { mount } from "@vue/test-utils";


describe("StartGameScene", ()=>{
    const wrapper = mount(StartGameScene);

    test("tets", ()=>{
        expect(wrapper.exists()).toBe(true);
    })
})