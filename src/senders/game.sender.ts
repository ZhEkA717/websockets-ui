import { getWsFromRoom, saveGame } from '../services/game.service';
import { TypeResponseCreateGame, TypeResponseStartGame } from '../types/game.type';
import { TypeRequestDataAddShips, TypeShips } from '../types/ship.type';
import { CommandTypes, ID_VALUE, rooms, shipsInGame } from '../utils/constants';

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

export const startGame = (index: number) => {
  shipsInGame
    .filter((item) => item.indexPlayer === index)
    .forEach((item) => {
      const { ships, indexPlayer: currentPlayerIndex, ws } = item as TypeShips;
      const responseStartGame: TypeResponseStartGame = {
        type: CommandTypes.startGame,
        data: JSON.stringify({ ships, currentPlayerIndex }),
        id: ID_VALUE,
      };

      ws.send(JSON.stringify(responseStartGame));
    });
};
