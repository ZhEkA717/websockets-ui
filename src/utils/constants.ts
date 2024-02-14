import { TypePlayer } from '../types/player';

export const PORT = Number(process.env.PORT) || 3000;

export const players: TypePlayer[] = [];

export const enum ListCommand {
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
}

export const enum ErrorTextResponse {
  req = 'Player is already exist!',
}
