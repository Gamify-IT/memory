import { CardType } from "./data-models";

interface CardDTO {
  content: string;
  type: CardType;
}

interface CardPairDTO {
  card1: CardDTO;
  card2: CardDTO;
}

export interface GameDataDTO {
  pairs: CardPairDTO[];
}

export class GameResultDTO {
  constructor(public configurationAsUUID: string, public playerId: string) {}
  public isFinished = true;
}
