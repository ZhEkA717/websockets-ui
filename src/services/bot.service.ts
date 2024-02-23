import { v4 } from 'uuid';
import { hugeShip, largeShip, mediumShip, rooms, smallShip } from '../utils/constants';
import { getExplosionArray } from './ship.service';
import { TypeGenerateShip, TypeShips } from '../types/ship.type';

export let positionInField: { x: number; y: number }[][] = [];

export const createRoomWithBot = (...params: { name: string; index: number }[]): number => {
  const roomId = new Date().valueOf();
  rooms.push({ roomId, roomUsers: params });
  return roomId;
};

const savePositions = ({ x, y }: { x: number; y: number }, direction: boolean, length: number) => {
  const positions: { x: number; y: number }[] = [];
  if (direction) {
    for (let i = 0; i < length; i++) {
      positions.push({ x, y: y + i });
    }
  } else {
    for (let i = 0; i < length; i++) {
      positions.push({ x: x + i, y });
    }
  }

  return positions;
};

const getNeighborPositions = (positions: { x: number; y: number }[]) => {
  return getExplosionArray(positions).map(({ x, y }) => ({ x, y }));
};

export const generateShips = () => {
  const ships: TypeGenerateShip[] = [];
  generateTypeShip(ships, smallShip);
  generateTypeShip(ships, mediumShip);
  generateTypeShip(ships, largeShip);
  generateTypeShip(ships, hugeShip);
  return ships;
};

const generateTypeShip = (ships: TypeGenerateShip[], typeShip: TypeGenerateShip) => {
  const { amount, length, type } = typeShip;
  if (amount)
    for (let i = 0; i < amount; i += 1) {
      const ship = {
        direction: [true, false][getRandom(1)],
        length,
        type,
      };
      ships.push(ship);
    }
};

export const getRandom = (n: number) => Math.floor(Math.random() * (n + 1));

export const getCoordinatesShip = (length: number, direction: boolean): { x: number; y: number } => {
  let x, y: number;

  if (direction) {
    x = getRandom(9);
    y = getRandom(9 - length);
  } else {
    x = getRandom(9 - length);
    y = getRandom(9);
  }

  const positions = savePositions({ x, y }, direction, length);
  const res = checkLocationShip(positions);

  if (!res) {
    return getCoordinatesShip(length, direction);
  }

  const neighborArr = getNeighborPositions(positions);
  neighborArr.push({ x, y });
  positionInField.push(neighborArr);

  return { x, y };
};

const checkLocationShip = (pos: { x: number; y: number }[]): boolean => {
  for (let i = 0; i < positionInField.length; i += 1) {
    const positions = positionInField[i];

    for (let i = 0; i < positions.length; i += 1) {
      const position = positions[i];

      for (let i = 0; i < pos.length; i += 1) {
        const { x, y } = pos[i];
        if (position.x === x && position.y === y) return false;
      }
    }
  }
  return true;
};

export const getShips = (): TypeShips[] => {
  positionInField = [];
  const ships = generateShips()
    .reverse()
    .map((item) => {
      const { length, direction } = item as { length: number; direction: boolean };
      const position = getCoordinatesShip(length, direction);

      return {
        position,
        direction,
        length,
        type: item.type,
      };
    });
  console.log(ships);
  return ships;
};
