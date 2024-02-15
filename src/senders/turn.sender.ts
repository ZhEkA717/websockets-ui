import { TypeResponseTurn } from '../types/turn.type';
import { CommandTypes, ID_VALUE, shipsInGame } from '../utils/constants';

export const turn = (currentPlayer: number) => {
  const responseTurn: TypeResponseTurn = {
    type: CommandTypes.turn,
    data: JSON.stringify({ currentPlayer }),
    id: ID_VALUE,
  };

  shipsInGame
    .filter((item) => item.indexPlayer === currentPlayer)
    .forEach((item) => {
      item.ws.send(JSON.stringify(responseTurn));
    });
};
