import axios, { AxiosResponse } from "axios";
import { CardData, GameData } from "./data-models";
import { GameDataDTO, GameResultDTO } from "./dtos";
import { emptyData } from "./empty-data";
import config from "@/config";

const configurationId = window.location.pathname.split("/").pop();
const rewards = 0;
export class MemoryController {
  hasConfigError = false;
  async postGameResult() {
    const result: GameResultDTO = new GameResultDTO(
      configurationId!,
      window.localStorage.getItem("userId")!,
      rewards!

    );
    console.log(result);
    let hasError = false;
    let response: AxiosResponse<any, any> | void;
    try {
      response = await axios.post(`${config.apiBaseUrl}/results`, result);
    } catch (error) {
      hasError = true;
    }

    if (!hasError && response) {
      const returnedResult = this.fromDTO(response.data);
      console.log(returnedResult);
    }

    return hasError;
  }
  gameData!: GameData;
  constructor() {
    this.gameData = this.convertDTOToData(emptyData);
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
        `${config.apiBaseUrl}/configurations/${configurationId}`
      );
      const gameData = this.convertDTOToData(result.data);
      this.gameData = gameData;
      this.shuffleCards();
      return gameData;
    } catch (error) {
      this.hasConfigError = true;
      const gameData = this.convertDTOToData(emptyData);
      this.gameData = gameData;
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

  private fromDTO(dto: any): GameResultDTO {
    return new GameResultDTO(
      dto.configurationAsUUID,
      dto.playerId,
      dto.rewards
    );
  }

}
