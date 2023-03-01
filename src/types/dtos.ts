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

interface GameDataDTO {
  pairs: CardPairDTO[];
}
