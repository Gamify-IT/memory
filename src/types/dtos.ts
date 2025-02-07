/**
 * Defines DTOs (Data Transfer Objects) for game data, including card pairs, volume settings, and game results.
 */

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
  volumeLevel: number | null;
}

export class GameResultDTO {
  constructor(
    public configurationAsUUID: string,
    public playerId: string,
    public rewards: number
  ) {}
  public isFinished = "true";
}
export class ImageDTO {
  constructor(public uuid: string, public image: string) {}
}
