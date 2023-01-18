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
    {
      card1: {
        content:
          "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
        type: CardType.IMAGE,
      },
      card2: {
        content: "test text for pair 4",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content:
          "https://www.shutterstock.com/image-vector/simple-mini-cartoon-ghost-vector-260nw-1470154256.jpg",
        type: CardType.IMAGE,
      },
      card2: {
        content: "test text for pair 5",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content: "HALLOOO",
        type: CardType.TEXT,
      },
      card2: {
        content: "test text for pair 6",
        type: CardType.TEXT,
      },
    },
  ],
};
