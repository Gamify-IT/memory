import { CardType } from "./data-models";
import { GameDataDTO } from "./dtos";

export const testData: GameDataDTO = {
  pairs: [
    {
      card1: {
        content:
          "He was a German-born theoretical physicist, widely acknowledged to be one of the greatest and most influential physicists of all time. He is best known for developing the theory of relativity, but he also made important contributions to the development of the theory of quantum mechanics.",
        type: CardType.TEXT,
      },
      card2: {
        content: "Albert Einstein",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content: "10*50-2",
        type: CardType.TEXT,
      },
      card2: {
        content: "498",
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
        content: "Latin Text",
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
        content: "Ghost",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content:
          '# h1 Heading  \n --- \n  ```java \npublic static void main(String[] args){\nSystem.out.println("yay");} \n``` \n \n _kursives etwas_ \n <center> \n | A | B | C | \n |--|--|--| \n | 1 | 2 | 3 | \n  </center>',
        type: CardType.MARKDOWN,
      },
      card2: {
        content: "Markdown",
        type: CardType.TEXT,
      },
    },
    {
      card1: {
        content: "Tschüss",
        type: CardType.TEXT,
      },
      card2: {
        content: "Auf Wiedersehen",
        type: CardType.TEXT,
      },
    },
  ],
};
