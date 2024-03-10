import { startGame } from '../senders/game.sender';
import { turn } from '../senders/turn.sender';
import { saveShip } from '../services/ship.service';
import { TypeRequestAddShips, TypeRequestDataAddShips } from '../types/ship.type';

export const addShipRequest = (message: string) => {
  const req = JSON.parse(message) as TypeRequestAddShips;
  const data: TypeRequestDataAddShips = JSON.parse(req.data as string);
  const isShipsOnFields = saveShip(data as TypeRequestDataAddShips);
  const { gameId } = data;
  if (isShipsOnFields) {
    startGame(gameId);
    turn(gameId);
  }
};
