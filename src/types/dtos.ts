interface CardDTO {
  content: string;
  type: CardType;
}

enum CardType {
  IMAGE,
  TEXT,
  MARKDOWN,
}

interface CardPairDTO {
  card1: CardDTO;
  card2: CardDTO;
}

interface GameDataDTO {
  pairs: CardPairDTO[];
}
