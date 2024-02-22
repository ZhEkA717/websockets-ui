import { TypeShip, TypeShipData } from '../types/ship.type';
import { searchShip } from './ship.service';

export const isFinish = (gameId: number) => {
  const shipsInGame: TypeShip | undefined = searchShip(gameId);

  const [player1, player2] = shipsInGame?.data as TypeShipData[];

  return player1.shipsAlive === 0 || player2.shipsAlive === 0;
};
