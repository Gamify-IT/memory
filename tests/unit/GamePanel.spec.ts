import { mount, VueWrapper } from "@vue/test-utils";
import GamePanel from "@/components/GamePanel.vue";
import ContentModal from "@/components/ContentModal.vue";
import MemoryCard from "@/components/MemoryCard.vue";
import PairItem from "@/components/PairItem.vue";

describe("GamePanel.vue", () => {
  let wrapper: VueWrapper;
  let card;
  let cards: VueWrapper<any>[];
  let button;
  let card1;
  let card1Props;
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
    let cardLength = cards.length;
    for (let j = 0; j < cardLength + 1; j++) {
      let card1Index = -1;
      let card2Index = -1;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].props().cardContent.pairid === j) {
          card1Index = i;
          card1 = cards[i];
          card1.trigger("click");
          await wrapper.vm.$nextTick();
          break;
        }
      }
      if (card1Index !== -1) {
        cards.splice(card1Index, 1);
      }
      jest.advanceTimersByTime(1000);
      await wrapper.vm.$nextTick();
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].props().cardContent.pairid === j) {
          card2Index = i;
          card2 = cards[i];
          card2.trigger("click");
          await wrapper.vm.$nextTick();
          break;
        }
      }
      if (card2Index !== -1) {
        cards.splice(card2Index, 1);
      }
      await wrapper.vm.$nextTick();
      jest.advanceTimersByTime(1000);
      await wrapper.vm.$nextTick();
    }
    await wrapper.vm.$nextTick();
    expect(cards.length).toBe(0);
    expect(wrapper.findAllComponents(PairItem).length).toBe(cardLength/2);
  });
});
