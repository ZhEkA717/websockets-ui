import { CommandTypes, ID_TYPE } from '../utils/constants';
import { TypeShip } from './ship.type';

export type TypeResponseCreateGame = {
  type: CommandTypes.createGame;
  data: TypeGame | string;
  id: ID_TYPE;
};

export type TypeGame = {
  idGame: number;
  idPlayer: number; // id for player in the game session, who have sent add_user_to_room request, not enemy *\
};

export type TypeResponseStartGame = {
  type: CommandTypes.startGame;
  data: {
    ships: TypeShip[];
    currentPlayerIndex: number;
  } | string;
  id: ID_TYPE;
};
