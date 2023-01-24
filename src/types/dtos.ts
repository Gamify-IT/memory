interface CardDTO {
  content: string;
  type: CardType;
}

enum CardType {
  IMAGE,
  TEXT,
}

interface CardPairDTO {
  card1: CardDTO;
  card2: CardDTO;
}

interface GameDataDTO {
  pairs: CardPairDTO[];
}
