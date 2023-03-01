import axios from "axios";
import { CardData, GameData } from "./data-models";
import { testData } from "./test-data";

const baseURL = "/minigames/memory/api/v1";
const configurationId = window.location.pathname.split("/").pop();

export class MemoryController {
  gameData!: GameData;
  constructor() {
    let gameDataDto: GameDataDTO;
    this.gameData = this.convertDTOToData(testData);
    //const fetched = this.fetchData();
    let test: GameDataDTO;
    axios
      .get<GameDataDTO>("${baseURL}/configurations/${configurationId}")
      .then((response) => {
        const gameData = this.convertDTOToData(test);
        this.gameData = gameData;
        this.shuffleCards();
      })
      .catch(() => {
        const gameData = this.convertDTOToData(testData);
        this.gameData = gameData;
        this.shuffleCards();
      });

    //  this.gameData = this.convertDTOToData(test);

    /*fetched.then((value) => {
      gameDataDto = value;
      this.gameData = this.convertDTOToData(gameDataDto);
    });*/
  }

  private convertDTOToData(gameDataDto: GameDataDTO) {
    const cards: CardData[] = [];
    gameDataDto.pairs.forEach((pair, index) => {
      cards.push(new CardData(pair.card1.content, pair.card1.type, index));
      cards.push(new CardData(pair.card2.content, pair.card2.type, index));
    });
    return new GameData(cards);
  }

  /*private fetchData(): GameDataDTO {
    return data;
  }*/

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
