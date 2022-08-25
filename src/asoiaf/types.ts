export enum CardTypes {
  CombatUnit = 'Combat Unit',
  Attachment = 'Attachment',
  NonCombatUnit = 'Non-Combat Unit',
  OpponentAttachment = 'Opponent Attachment',
  TacticsCard = 'Tactics Card',
}

export interface Card {
  type: CardTypes;
  name: string;
  imageUrl: string;
  imageUrlBack?: string;
}

export interface CardData {
  [key: string]: Card;
}
