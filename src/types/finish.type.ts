import { CommandTypes, ID_TYPE } from '../utils/constants';

export type TypeFinishResponse = {
  type: CommandTypes.finish;
  data:
    | {
        winPlayer: number;
      }
    | string;
  id: ID_TYPE;
};
