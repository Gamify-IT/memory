import axios from "axios";
import { CardData, GameData } from "./data-models";
import { testData } from "./test-data";

const baseURL = "/minigames/memory/api/v1";
const configurationId = window.location.pathname.split("/").pop();

export class MemoryController {
  postGameResult() {
    axios.post(`${baseURL}/results`, new GameResultDTO(true));
  }
  gameData!: GameData;
  constructor() {
    this.gameData = this.convertDTOToData(testData);
  }

  private convertDTOToData(gameDataDto: GameDataDTO) {
    const cards: CardData[] = [];
    gameDataDto.pairs.forEach((pair, index) => {
      cards.push(new CardData(pair.card1.content, pair.card1.type, index));
      cards.push(new CardData(pair.card2.content, pair.card2.type, index));
    });
    return new GameData(cards);
  }

  public async fetchData(): Promise<GameData> {
    try {
      const result = await axios.get<GameDataDTO>(
        `${baseURL}/configurations/${configurationId}`
      );
      const gameData = this.convertDTOToData(result.data);
      this.gameData = gameData;
      this.shuffleCards();
      return gameData;
    } catch (error) {
      const gameData = this.convertDTOToData(testData);
      this.gameData = gameData;
      this.shuffleCards();
      return gameData;
    }
  }

  private shuffleCards() {
    const cards = this.gameData.cards;
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  }
}
