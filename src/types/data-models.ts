/**
 * Represents the data structure for cards in a memory game, including card content, type, selection state, and matched pairs.
 */

export class CardData {
  public found = false;
  public flipped = false;
  public selection = CardSelection.UNSELECTED;

  constructor(
    public content: string,
    public type: CardType,
    public pairid: number,
    public image?: Blob
  ) {}
}
export enum CardSelection {
  UNSELECTED,
  MATCH,
  MISMATCH,
}

export enum CardType {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  MARKDOWN = "MARKDOWN",
}
export class CardPair {
  constructor(public card1: CardData, public card2: CardData) {}
}

export class GameData {
  constructor(public cards: CardData[]) {}
}
