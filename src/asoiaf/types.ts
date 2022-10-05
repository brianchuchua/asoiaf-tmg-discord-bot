export enum CardTypes {
  None = 'Unknown Type',
  Commander = 'Commander',
  CombatUnit = 'Combat Unit',
  Attachment = 'Attachment',
  NonCombatUnit = 'Non-Combat Unit',
  OpponentAttachment = 'Opponent Attachment',
  TacticsCard = 'Tactics Card',
  TacticsZone = 'Tactics Zone',
  InformationCard = 'Information Card',
  GameMode = 'Game Mode',
}

export const TYPE_PREFIX = 't:';

type CardTypeCommands = {
  [CardTypes.None]?: string[];
  [CardTypes.Commander]?: string[];
  [CardTypes.CombatUnit]: string[];
  [CardTypes.Attachment]: string[];
  [CardTypes.NonCombatUnit]: string[];
  [CardTypes.OpponentAttachment]: string[];
  [CardTypes.TacticsCard]: string[];
  [CardTypes.TacticsZone]: string[];
  [CardTypes.InformationCard]: string[];
  [CardTypes.GameMode]: string[];
};

export const cardTypeCommands: CardTypeCommands = {
  [CardTypes.Commander]: ['commander', 'cm', 'c'],
  [CardTypes.CombatUnit]: ['combatunit', 'cu'],
  [CardTypes.Attachment]: ['attachment', 'a'],
  [CardTypes.NonCombatUnit]: ['noncombatunit', 'ncu', 'nc', 'n'],
  [CardTypes.OpponentAttachment]: ['opponentattachment', 'oa', 'o'],
  [CardTypes.TacticsCard]: ['tacticscard', 'tactics', 'tactic', 'tc', 't'],
  [CardTypes.TacticsZone]: ['tacticszone', 'tz'],
  [CardTypes.InformationCard]: ['informationcard', 'info', 'i'],
  [CardTypes.GameMode]: ['gamemode', 'gm'],
};

export interface Card {
  type: CardTypes;
  name: string;
  imageUrl: string;
  imageUrlBack?: string;
  isCommander?: boolean;
}

export interface CardData {
  [key: string]: Card;
}
