import { CardData, GameData } from "@/types/data-models";
import { GameDataDTO } from "@/types/dtos";
import { emptyData } from "@/types/empty-data";

function convertDTOToData(data: GameDataDTO) {
  const cards: CardData[] = [];
  data.pairs.forEach((pair, index) => {
    cards.push(new CardData(pair.card1.content, pair.card1.type, index));
    cards.push(new CardData(pair.card2.content, pair.card2.type, index));
  });
  return new GameData(cards);
}

describe("memory-controller.ts", () => {
  convertDTOToData(emptyData);
  test("dummytest", async() => {
    expect(true).toBe(true);
  })
});
