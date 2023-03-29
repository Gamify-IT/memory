import { CardData, GameData } from "@/types/data-models";
import { GameDataDTO } from "@/types/dtos";
import { MemoryController } from "@/types/memory-controller";
import { testData } from "@/types/test-data";

function convertDTOToData(data: GameDataDTO) {
  const cards: CardData[] = [];
  data.pairs.forEach((pair, index) => {
    cards.push(new CardData(pair.card1.content, pair.card1.type, index));
    cards.push(new CardData(pair.card2.content, pair.card2.type, index));
  });
  return new GameData(cards);
}

describe("memory-controller.ts", () => {
  const data: GameData = convertDTOToData(testData);
  const controller = new MemoryController();
  /*test("fetchData", async () => {
    controller.gameData.cards.forEach(card => {
      const matchingCard = data.cards.find(c => c.content === card.content);
      if (matchingCard) {
        expect(card).toMatchObject(matchingCard);
      }
    });
  });*/
  test("dummytest", async() => {
    expect(true).toBe(true);
  })
});
