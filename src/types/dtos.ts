interface CardDTO {
  content: string;
  type: CardType;
}

enum CardType {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  MARKDOWN = "MARKDOWN",
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
