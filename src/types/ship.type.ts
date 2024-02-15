import { CommandTypes, ID_TYPE } from '../utils/constants';

export type TypeRequestAddShips = {
  type: CommandTypes.addShips;
  data: TypeShips | string;
  id: ID_TYPE;
};

export type TypeShips = {
  gameId: number;
  ships: TypeShip[];
  indexPlayer: number;
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
