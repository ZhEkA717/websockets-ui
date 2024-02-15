import { saveShip } from '../services/ship.service';
import { TypeRequestAddShips, TypeShips } from '../types/ship.type';
import { games, shipsInGame } from '../utils/constants';

export const addShipRequest = (playerId: number, message: string) => {
  const { data } = JSON.parse(message) as TypeRequestAddShips;
  const { gameId, ships, indexPlayer } = JSON.parse(data as string);

  saveShip(data as TypeShips);

  console.log(games);
};
