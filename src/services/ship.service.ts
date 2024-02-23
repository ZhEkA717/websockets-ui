import { attackResponse } from '../senders/attack.sender';
import { TypeDataRequestAttack, TypeStatusAttack } from '../types/attack.type';
import {
  TypeModifyShips,
  TypeRequestDataAddShips,
  TypeShip,
  TypeShipData,
  TypeShips,
  TypeStatusShip,
} from '../types/ship.type';
import { CommandTypes, ShipStatus, shipsInGame } from '../utils/constants';
import { log } from './log.service';
import { searchPlayer } from './player.service';

export const saveShip = (data: TypeRequestDataAddShips) => {
  const { gameId, ships, indexPlayer } = data;
  const player = searchPlayer(indexPlayer);
  const shipInGame = searchShip(gameId);
  const shipsModified = shipPositions(ships);
  const shipsAlive = ships.length;
  if (player) {
    const dataShip: TypeShipData = { ...player, ships, shipsModified, shipsAlive };

    if (shipInGame) {
      shipInGame.data.push(dataShip);
    } else {
      const ship: TypeShip = {
        gameId,
        data: [],
      };
      ship.data.push(dataShip);
      shipsInGame.push(ship);
    }
    log(CommandTypes.addShips, `GameId: ${gameId}`, `PlayerId: ${indexPlayer}`);
  }
  return searchShip(gameId)?.data.length === 2;
};

export const searchShip = (id: number): TypeShip | undefined => shipsInGame.find((ship) => ship.gameId === id);

export const shipPositions = (ships: TypeShips[]): TypeModifyShips[] => {
  return ships.map(({ direction, position: { x, y }, length }) => {
    let positions: { x: number; y: number; status: TypeStatusShip }[] = [];
    const status: TypeStatusShip = ShipStatus.alive;
    if (direction) {
      for (let i = 0; i <= length - 1; i++) {
        positions.push({ x, y: y + i, status });
      }
    } else {
      for (let i = 0; i <= length - 1; i++) {
        positions.push({ x: x + i, y, status });
      }
    }

    return { positions };
  });
};

export const getLengthShip = (ship: TypeModifyShips): number => {
  return ship.positions.filter((item) => item.status === ShipStatus.alive).length;
};

export const shipExplosion = (
  player: TypeShipData,
  { indexPlayer, gameId, x, y }: TypeDataRequestAttack,
  type: CommandTypes,
) => {
  let position: { x: number; y: number; status: TypeStatusShip } | undefined;
  const isShot = player.shipsModified.find(({ positions }) => {
    position = positions.find((pos) => pos.x === x && pos.y === y);
    return position;
  });

  const { positions } = isShot as TypeModifyShips;

  const explosionArray = getExplosionArray(positions);

  explosionArray.forEach(({ x, y, status }) => {
    attackResponse({ indexPlayer, gameId, x, y }, status, type);
  });
};

export const getExplosionArray = (positions: { x: number; y: number; status?: TypeStatusShip }[]) => {
  const explosionArray: { x: number; y: number; status: TypeStatusAttack }[] = [];
  positions.forEach(({ x, y }) => {
    const status = ShipStatus.miss;
    explosionArray.push({ x: x - 1, y, status });
    explosionArray.push({ x: x + 1, y, status });
    explosionArray.push({ x, y: y - 1, status });
    explosionArray.push({ x, y: y + 1, status });
    explosionArray.push({ x: x - 1, y: y - 1, status });
    explosionArray.push({ x: x + 1, y: y + 1, status });
    explosionArray.push({ x: x - 1, y: y + 1, status });
    explosionArray.push({ x: x + 1, y: y - 1, status });
  });
  positions.forEach(({ x, y }, i) => {
    const status = ShipStatus.killed;
    explosionArray.forEach((item) => {
      if (item.x === x && item.y === y) {
        item.status = status;
      }
    });
  });

  return explosionArray;
};
