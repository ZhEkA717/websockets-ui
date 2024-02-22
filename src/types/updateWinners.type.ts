import { CommandTypes, ID_TYPE } from '../utils/constants';
import { TypePlayer } from './player.type';

export type TypeResponseUpdateWinner = {
  type: CommandTypes.updateWinners;
  data: string | TypeResponseDataWinner[];
  id: ID_TYPE;
};

export type TypeResponseDataWinner = {
  name: string;
  wins: number;
};

export type TypeWinners = {
  player: TypePlayer;
  wins: number;
};
