import { log } from '../services/log.service';
import { TypeFinishResponse } from '../types/finish.type';
import { TypeShipData } from '../types/ship.type';
import { CommandTypes, ID_VALUE } from '../utils/constants';
import { searchWinner } from './updateWinners.sender';

export const getFinishResponse = (idPlayer: number): string => {
  const response: TypeFinishResponse = {
    type: CommandTypes.finish,
    data: JSON.stringify({
      winPlayer: idPlayer,
    }),
    id: ID_VALUE,
  };
  return JSON.stringify(response);
};

export const finish = (data: TypeShipData[] | undefined, idPlayer: number) => {
  if (data) {
    data.forEach(({ ws }) => {
      ws?.send(getFinishResponse(idPlayer));
    });
  }
  const winner = searchWinner(idPlayer);
  winner && winner.wins++;
  log(CommandTypes.finish, `Win: ${winner?.player.name}`);
};
