import { testData } from "@/types/test-data";
import { CardType } from "@/types/data-models";

test("testData has the correct pairs of cards", () => {
  expect(testData.pairs.length).toBe(6);
  expect(testData.pairs[0]).toEqual({
    card1: {
      content:
        "He was a German-born theoretical physicist, widely acknowledged to be one of the greatest and most influential physicists of all time. He is best known for developing the theory of relativity, but he also made important contributions to the development of the theory of quantum mechanics.",
      type: CardType.TEXT,
    },
    card2: {
      content: "Albert Einstein",
      type: CardType.TEXT,
    },
  });
});
