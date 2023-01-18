import { CardType } from "./DataModels";

export const testData: GameDataDTO = {
  pairs: [
    {
      card1: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
        type: CardType.TEXT,
      },
      card2: {
        content: "test text for pair 1",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
        type: CardType.TEXT,
      },
      card2: {
        content: "test text for pair 2",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio vel sequi. Nam dolorem qui consectetur corrupti quod optio. Libero sequi harum debitis. Quae mollitia aspernatur obcaecati, repellendus eveniet doloribus!",
        type: CardType.TEXT,
      },
      card2: {
        content: "test text for pair 3",
        type: CardType.TEXT,
      },
    },
  ],
};
