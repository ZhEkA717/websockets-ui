import { CommandTypes, ID_TYPE } from '../utils/constants';

export type TypeResponseTurn = {
  type: CommandTypes.turn;
  data: {
    currentPlayer: number;
  } | string;
  id: ID_TYPE;
};

export type TypeTurnInGame = {
  [key: number] : number; // idGame: idPlayer
} 
