export class CardData {
  public found = false;
  public flipped = false;

  constructor(
    public content: string,
    public type: CardType,
    public pairid: number
  ) {}
}

export enum CardType {
  IMAGE,
  TEXT,
}
export class CardPair {
  constructor(public card1: CardData, public card2: CardData) {}
}

export class GameData {
  constructor(public cards: CardData[]) {}
}
