import { mount, VueWrapper } from "@vue/test-utils";
import GamePanel from "@/components/GamePanel.vue";
import ContentModal from "@/components/ContentModal.vue";
import MemoryCard from "@/components/MemoryCard.vue";
import PairItem from "@/components/PairItem.vue";


  describe("GamePanel.vue", () => {
    let wrapper: VueWrapper;
    let card;
    let cards;
    let button;
    let card1;
    let card2;
    beforeEach(() => {
        wrapper = mount(GamePanel);
        jest.useFakeTimers();
    });

    test("test", () => {
        expect(wrapper.exists()).toBe(true);
    });

    test("GamePanel gets displayed", () => {
        expect(wrapper.find("#game-panel").exists()).toBe(true);
    });

    test("opens and closes ContentModal correctly", async () => {
      card = wrapper.findComponent(MemoryCard);
      expect(card.exists()).toBe(true);
      button = card.find("#detail-view");
      expect(button.exists()).toBe(true);
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(ContentModal).exists()).toBe(true);
      wrapper.find("#close-button").trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(ContentModal).exists()).toBe(false);
    });

    test("card reveal procedure", async () => {
     cards = wrapper.findAllComponents(MemoryCard);
     expect(cards.length).toBe(12);
     card1 = cards[0];
     card2 = cards[1];
     card1.trigger("click");
     await wrapper.vm.$nextTick();
     card2.trigger("click");
     await wrapper.vm.$nextTick();
     jest.advanceTimersByTime(1000);
     await wrapper.vm.$nextTick();
     expect(wrapper.findAllComponents(PairItem).length).toBe(1);
    })
  });