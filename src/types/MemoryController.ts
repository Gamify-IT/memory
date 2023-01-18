import { CardData, GameData } from "./DataModels";
import { testData } from "./TestData";

export class MemoryController {
  gameData: GameData;
  constructor() {
    const gameDataDto: GameDataDTO = this.fetchData();
    this.gameData = this.convertDTOToData(gameDataDto);
    this.shuffleCards();
  }

  private convertDTOToData(gameDataDto: GameDataDTO) {
    const cards: CardData[] = [];
    gameDataDto.pairs.forEach((pair, index) => {
      cards.push(new CardData(pair.card1.content, pair.card1.type, index));
      cards.push(new CardData(pair.card2.content, pair.card2.type, index));
    });
    return new GameData(cards);
  }

  private fetchData(): GameDataDTO {
    return testData;
  }

  private shuffleCards() {
    this.gameData.cards.sort(function () {
      return 0.5 - Math.random();
    });
  }
}
