import { testData } from "@/types/test-data";
import { CardType } from "@/types/data-models";

test("testData has the correct pairs of cards", () => {
  expect(testData.pairs.length).toBe(6);
  expect(testData.pairs[0]).toEqual({
    card1: {
      content:
      '<span style="color:red"> !!ERROR!! </span>   \n --- \n  <span style="color:red">Configuration could not be fetched!!</span> \n --- \n <span style="color:red">!!!!ERROR!!!!</span> ',
      type: CardType.MARKDOWN,      
    },
    card2: {
      content: '<span style="color:red"> !!ERROR!! </span>   \n --- \n  <span style="color:red">Configuration could not be fetched!!</span> \n --- \n <span style="color:red">!!!!ERROR!!!!</span> ',
      type: CardType.MARKDOWN,
    },
  });
});
