import { CommandTypes } from '../utils/constants';

export const log = async (type: CommandTypes, ...params: (string | number)[]) => {
  let logs: string = type;
  params.forEach(item => {
    logs += ` ${item}`;
  });

  console.log(logs);
};
