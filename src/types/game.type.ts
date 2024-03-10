import { CommandTypes, ID_TYPE } from '../utils/constants';
import { TypePlayer } from './player.type';
import { TypeShip } from './ship.type';

export type TypeResponseCreateGame = {
  type: CommandTypes.createGame;
  data: TypeResponseDataGame | string;
  id: ID_TYPE;
};

export type TypeResponseDataGame = {
  idGame: number;
  idPlayer: number; // id for player in the game session, who have sent add_user_to_room request, not enemy *\
};

export type TypeGame = {
  idGame: number;
  players: TypePlayer[]; // length === 2 players in room
};

export type TypeResponseStartGame = {
  type: CommandTypes.startGame;
  data:
    | {
        ships: TypeShip[];
        currentPlayerIndex: number;
      }
    | string;
  id: ID_TYPE;
};
