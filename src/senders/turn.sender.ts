import { eventEmitter } from '../handlers/singlePlay.handler';
import { log } from '../services/log.service';
import { searchShip } from '../services/ship.service';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { TypeResponseTurn } from '../types/turn.type';
import { CommandTypes, ID_VALUE, turnInGame } from '../utils/constants';

export let currentPlayer: number;

export const turn = (idGame: number): number => {
  const { data } = searchShip(idGame) as TypeShip;
  const [player1, player2]: TypeShipData[] = data as TypeShipData[];

  currentPlayer = getCurrentPlayer(player1.id, player2.id);

  turnInGame[idGame] = currentPlayer;

  const responseTurn: TypeResponseTurn = {
    type: CommandTypes.turn,
    data: JSON.stringify({ currentPlayer }),
    id: ID_VALUE,
  };

  data.forEach(({ ws }) => {
    ws?.send(JSON.stringify(responseTurn));
  });
  log(CommandTypes.turn, currentPlayer);
  eventEmitter.emit(CommandTypes.attack, currentPlayer);
  return currentPlayer;
};

const getCurrentPlayer = (id1: number, id2: number): number => {
  if (currentPlayer) {
    currentPlayer = currentPlayer === id1 ? id2 : id1;
  } else {
    currentPlayer = [id1, id2][Math.floor(Math.random() * 2)];
  }
  return currentPlayer;
};
