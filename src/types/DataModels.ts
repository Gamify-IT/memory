export class CardContent {
  constructor(public content: string, public type: string, public id: number) { }
}

export class CardPair {
  constructor(public card1: CardContent, public card2: CardContent) { }
}

export class GameData {
  constructor(public pairs: CardPair[]) { }

  public getRandomCardOrder(): CardContent[] {
    const allCards = new Array(this.pairs.length);
    this.pairs.forEach(element => {
      allCards.push(element.card1);
      allCards.push(element.card2);
    });
    return allCards.sort(function () { return 0.5 - Math.random() });
  }
}
