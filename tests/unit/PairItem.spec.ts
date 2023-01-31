import { CardData, CardPair, CardType } from "@/types/data-models";
import { mount, VueWrapper } from "@vue/test-utils";
import PairItem from "@/components/PairItem.vue";

function examplePair(): CardPair {
  return new CardPair(
    new CardData("card1", CardType.TEXT, 2),
    new CardData("card2", CardType.TEXT, 2)
  );
}

describe("PairItem.vue", () => {
  let wrapper: VueWrapper;
  let pair: CardPair;
  beforeEach(() => {
    pair = examplePair();
  });
  test("receives and uses pair props", () => {
    wrapper = mount(PairItem, {
      props: { pair },
    });
    expect(wrapper.find(".card-container").exists()).toBe(true);
    expect(wrapper.findAll(".card-container").length).toBe(2);
  });
});
