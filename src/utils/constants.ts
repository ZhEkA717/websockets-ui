import { TypeGame } from '../types/game.type';
import { TypePlayer } from '../types/player.type';
import { TypeRoom } from '../types/room.type';
import { TypeGenerateShip, TypeShip } from '../types/ship.type';
import { TypeTurnInGame } from '../types/turn.type';
import { TypeWinners } from '../types/updateWinners.type';

export const PORT = Number(process.env.PORT) || 3000;

export const players: TypePlayer[] = [];

export const winners: TypeWinners[] = [];

export const rooms: TypeRoom[] = [];

export const games: TypeGame[] = [];

export const shipsInGame: TypeShip[] = [];

export const turnInGame: TypeTurnInGame = <TypeTurnInGame>{};

export const enum CommandTypes {
  reg = 'reg',
  updateWinners = 'update_winners',
  createRoom = 'create_room',
  addUserToRoom = 'add_user_to_room',
  createGame = 'create_game',
  updateRoom = 'update_room',
  addShips = 'add_ships',
  startGame = 'start_game',
  attack = 'attack',
  randomAttack = 'randomAttack',
  turn = 'turn',
  finish = 'finish',
  singlePlay = 'single_play',
}

export const enum ShipStatus {
  alive = 'alive',
  miss = 'miss',
  shot = 'shot',
  killed = 'killed',
}

export const smallShip: TypeGenerateShip = {
  amount: 4,
  length: 1,
  type: 'small',
};
export const mediumShip: TypeGenerateShip = {
  amount: 3,
  length: 2,
  type: 'medium',
};
export const largeShip: TypeGenerateShip = {
  amount: 2,
  length: 3,
  type: 'large',
};
export const hugeShip: TypeGenerateShip = {
  amount: 1,
  length: 4,
  type: 'huge',
};

export const enum ErrorTextResponse {
  req = 'Player is already exist!',
}

export type ID_TYPE = 0;
export const ID_VALUE = 0;
