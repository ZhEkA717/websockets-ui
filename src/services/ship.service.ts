import { TypeRequestDataAddShips } from '../types/ship.type';
import { shipsInGame } from '../utils/constants';
import { WebSocket } from 'ws';

export const saveShip = (ships: TypeRequestDataAddShips, ws: WebSocket) => {
  shipsInGame.push({...ships, ws});
};
