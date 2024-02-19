import { CommandTypes, ID_TYPE } from '../utils/constants';
import { TypeStatusAttack } from './attack.type';
import { TypePlayer } from './player.type';

export type TypeRequestAddShips = {
  type: CommandTypes.addShips;
  data: TypeRequestDataAddShips | string;
  id: ID_TYPE;
};

export type TypeRequestDataAddShips = {
  gameId: number;
  ships: TypeShips[];
  indexPlayer: number;
};

export type TypeShip = {
  gameId: number;
  data: TypeShipData[];
};

export type TypeShipData = TypePlayer & {
  ships: TypeShips[],
  shipsModified: TypeModifyShips[],
  shipsAlive: number
}

export type TypeModifyShips = {
  positions: {
    x: number;
    y: number;
    status: TypeStatusShip;
  }[];
}

export type TypeShips = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: TypeSizeShip;
};
export type TypeStatusShip = 'alive' | TypeStatusAttack; 
type TypeSizeShip = 'small' | 'medium' | 'large' | 'huge';
