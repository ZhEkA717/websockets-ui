import { getFinishResponse } from '../services/finish.service';
import { log } from '../services/log.service';
import { TypeShipData } from '../types/ship.type';
import { CommandTypes } from '../utils/constants';
import { searchWinner } from './updateWinners.sender';

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
