import { startGame } from '../senders/game.sender';
import { turn } from '../senders/turn.sender';
import { saveShip } from '../services/ship.service';
import { TypeRequestAddShips, TypeRequestDataAddShips } from '../types/ship.type';
import { shipsInGame } from '../utils/constants';
import { WebSocket } from 'ws';

export const addShipRequest = (message: string, ws: WebSocket) => {
  const req = JSON.parse(message) as TypeRequestAddShips;
  const data: TypeRequestDataAddShips = JSON.parse(req.data as string);
  saveShip(data as TypeRequestDataAddShips, ws);

  const bothField = shipsInGame.filter((item) => item.indexPlayer === data.indexPlayer);

  if (bothField.length === 2) {
    startGame(data.indexPlayer);
    turn(data.indexPlayer);
  }
};
