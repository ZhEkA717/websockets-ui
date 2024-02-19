import { searchShip } from '../services/ship.service';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { TypeResponseTurn } from '../types/turn.type';
import { CommandTypes, ID_VALUE, turnInGame } from '../utils/constants';

let currentPlayer: number;

export const turn = (idGame: number) => {
  const { data } = searchShip(idGame) as TypeShip;
  const [player1, player2]:TypeShipData[] = data as TypeShipData[];

  if (currentPlayer) {
    currentPlayer = currentPlayer === player1.id ? player2.id : player1.id; 
  } else {
    currentPlayer = player1.id;
  }

  turnInGame[idGame] = currentPlayer;

  const responseTurn: TypeResponseTurn = {
    type: CommandTypes.turn,
    data: JSON.stringify({ currentPlayer }),
    id: ID_VALUE,
  };

  player1.ws.send(JSON.stringify(responseTurn));
  player2.ws.send(JSON.stringify(responseTurn));
};
