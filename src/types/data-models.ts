export class CardData {
  public id = 0;
  public found = false;

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
