/**
 * Manages the game's data, including fetching game configurations, shuffling cards,
 * posting game results, and handling volume settings.
 */

import axios, { AxiosResponse } from "axios";
import { CardData, GameData } from "./data-models";
import { GameDataDTO, GameResultDTO } from "./dtos";
import { emptyData } from "./empty-data";
import config from "@/config";
import store from "@/store/index";


const configurationId = window.location.pathname.split("/").pop();
const rewards = 0;
export class MemoryController {
  hasConfigError = false;
  volumeLevel: number | null = 1;

  /**
   * Posts the game result to the server.
   * Sends the result, including configuration ID, player ID, and rewards, to the server.
   * @returns {boolean} Whether there was an error posting the result.
   */
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
      store.commit('setRewards', returnedResult.rewards)
    }

    return hasError;
  }
  gameData!: GameData;
  constructor() {
    this.gameData = this.convertDTOToData(emptyData);
  }

  /**
   * Converts a GameDataDTO object into a GameData object.
   * @param {GameDataDTO} gameDataDto - The DTO to convert.
   * @returns {GameData} The converted game data.
   */
  private convertDTOToData(gameDataDto: GameDataDTO) {
    const cards: CardData[] = [];
    gameDataDto.pairs.forEach((pair, index) => {
      cards.push(new CardData(pair.card1.content, pair.card1.type, index));
      cards.push(new CardData(pair.card2.content, pair.card2.type, index));
    });
    return new GameData(cards);
  }

  /**
   * Fetches game data from the server.
   * Retrieves the configuration, including volume level and card pairs, and shuffles the cards.
   * @returns {Promise<GameData>} The fetched game data.
   */
  public async fetchData(): Promise<GameData> {
    try {
      const result = await axios.get<GameDataDTO>(
        `${config.apiBaseUrl}/configurations/${configurationId}/volume`
      );
      const gameData = this.convertDTOToData(result.data);
      this.gameData = gameData;
      this.volumeLevel = result.data.volumeLevel;
      this.shuffleCards();
      return gameData;
    } catch (error) {
      this.hasConfigError = true;
      const gameData = this.convertDTOToData(emptyData);
      this.gameData = gameData;
      return gameData;
    }
  }

  /**
   * Shuffles the cards in the game.
   * Randomly rearranges the cards array in the game data.
   */
  private shuffleCards() {
    const cards = this.gameData.cards;
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  }

  /**
   * Converts a raw DTO into a GameResultDTO.
   * @param {any} dto - The raw DTO to convert.
   * @returns {GameResultDTO} The converted result DTO.
   */
  private fromDTO(dto: any): GameResultDTO {
    return new GameResultDTO(
      dto.configurationAsUUID,
      dto.playerId,
      dto.rewards
    );
  }

  /**
   * Creates an audio element with the volume level set based on the current configuration.
   * @param {string} pathToAudioFile - The path to the audio file.
   * @returns {HTMLAudioElement} The audio element with the configured volume level.
   */
  createAudioWithVolume(pathToAudioFile: string): HTMLAudioElement {
    const audio = new Audio(pathToAudioFile);
    if (this.volumeLevel == 2 || this.volumeLevel == 3)
    {
      this.volumeLevel = 1;
    } else if (this.volumeLevel == 1)
    {
      this.volumeLevel = 0.5;
    }
    audio.volume = this.volumeLevel !== null ? this.volumeLevel : 1;
    return audio;
  }
}
