import { getWsFromRoom, saveGame } from '../services/game.service';
import { TypeResponseCreateGame } from '../types/game.type';
import { CommandTypes, ID_VALUE } from '../utils/constants';

export const createGame = (indexRoom: number, idPlayer: number) => {
  const wsInRoom = getWsFromRoom(indexRoom);
  const data = {
    idGame: new Date().valueOf(),
    idPlayer,
  };

  saveGame(data);

  const responseCreateGame: TypeResponseCreateGame = {
    type: CommandTypes.createGame,
    data: JSON.stringify(data),
    id: ID_VALUE,
  };

  wsInRoom.forEach((ws) => {
    ws.send(JSON.stringify(responseCreateGame));
  });
};
