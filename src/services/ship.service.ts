import { TypeRequestDataAddShips, TypeShip, TypeShipData } from '../types/ship.type';
import { shipsInGame } from '../utils/constants';
import { searchPlayer } from './player.service';

export const saveShip = (data: TypeRequestDataAddShips) => {
  const { gameId, ships, indexPlayer } = data;
  const player = searchPlayer(indexPlayer);
  const shipInGame = searchShip(gameId);
  if (player) {
    const dataShip: TypeShipData = { ...player, ships };

    if (shipInGame) {
      shipInGame.data.push(dataShip);
    } else {
      const ship: TypeShip = {
        gameId,
        data: []
      }
      ship.data.push(dataShip);
      shipsInGame.push(ship);
    }
  }
  return searchShip(gameId)?.data.length === 2;
};

export const searchShip = (id: number): TypeShip | undefined => shipsInGame.find(ship => ship.gameId === id);

