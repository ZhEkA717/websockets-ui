import { searchShip } from '../services/ship.service';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { TypeResponseTurn } from '../types/turn.type';
import { CommandTypes, ID_VALUE, shipsInGame } from '../utils/constants';

export const turn = (idGame: number) => {
  const { data } = searchShip(idGame) as TypeShip;
  const [player1, player2]:TypeShipData[] = data as TypeShipData[];

  const responseTurn: TypeResponseTurn = {
    type: CommandTypes.turn,
    data: JSON.stringify({ currentPlayer: player1.id}),
    id: ID_VALUE,
  };

  player1.ws.send(JSON.stringify(responseTurn));
  player2.ws.send(JSON.stringify(responseTurn));
};
