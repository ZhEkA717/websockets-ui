import { CommandTypes, ID_TYPE } from '../utils/constants';
import { WebSocket } from 'ws';

export type TypeRequestAddShips = {
  type: CommandTypes.addShips;
  data: TypeRequestDataAddShips | string;
  id: ID_TYPE;
};

export type TypeRequestDataAddShips = {
  gameId: number;
  ships: TypeShip[];
  indexPlayer: number;
};

export type TypeShips = TypeRequestDataAddShips & {
  ws: WebSocket;
};

export type TypeShip = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: TypeSizeShip;
};

type TypeSizeShip = 'small' | 'medium' | 'large' | 'huge';
