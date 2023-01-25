import { CardData, GameData } from "@/types/data-models";
import { MemoryController } from "@/types/memory-controller";
import { testData } from "@/types/test-data";

function convertDTOToData(data: GameDataDTO){
    const cards: CardData[] = [];
    data.pairs.forEach((pair, index) => {
      cards.push(new CardData(pair.card1.content, pair.card1.type, index));
      cards.push(new CardData(pair.card2.content, pair.card2.type, index));
    });
    return new GameData(cards);
}

describe("memory-controller.ts", () => {
    let data: GameData;
    data = convertDTOToData(testData);
    let controller = new MemoryController();
    test("fetchData",async () => {
        expect(controller.gameData).toEqual(data);
    } )
});
