import { CommandTypes } from '../utils/constants';

export const log = async (type: CommandTypes) => {
  console.log(type);
};
