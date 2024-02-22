import { log } from '../services/log.service';
import { searchPlayer } from '../services/player.service';
import { TypePlayer } from '../types/player.type';
import { TypeResponseDataWinner, TypeResponseUpdateWinner } from '../types/updateWinners.type';
import { CommandTypes, ID_VALUE, winners } from '../utils/constants';

export const updateWinners = () => {
  const data: TypeResponseDataWinner[] = winners
    .map(({ player: { name }, wins }) => ({ name, wins }))
    .sort((a, b) => b.wins - a.wins);
  winners.forEach(({ player: { ws } }) => {
    const res: TypeResponseUpdateWinner = {
      type: CommandTypes.updateWinners,
      data: JSON.stringify(data),
      id: ID_VALUE,
    };
    ws.send(JSON.stringify(res));
  });
  log(CommandTypes.updateWinners);
};

export const saveWinner = (idPlayer: number) => {
  const player: TypePlayer | undefined = searchPlayer(idPlayer);
  player && winners.push({ player, wins: 0 });
};

export const searchWinner = (id: number) => winners.find(({ player }) => player.id === id);
