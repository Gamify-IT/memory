export class CardData {
  public found = false;
  public flipped = false;
  public selection = CardSelection.UNSELECTED;

  constructor(
    public content: string,
    public type: CardType,
    public pairid: number
  ) {}
}
export enum CardSelection {
  UNSELECTED,
  MATCH,
  MISMATCH,
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
