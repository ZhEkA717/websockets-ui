import { getPlayerFromRoom, saveGame } from '../services/game.service';
import { log } from '../services/log.service';
import { searchShip } from '../services/ship.service';
import { TypeGame, TypeResponseCreateGame, TypeResponseDataGame, TypeResponseStartGame } from '../types/game.type';
import { TypePlayer } from '../types/player.type';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { CommandTypes, ID_VALUE, games } from '../utils/constants';

export const createGame = (indexRoom: number): number => {
  const playersInRoom: TypePlayer[] = getPlayerFromRoom(indexRoom);
  const idGame = new Date().valueOf();

  saveGame(idGame, playersInRoom);

  const game: TypeGame | undefined = games.find((game) => game.idGame === idGame);

  if (game) {
    const { players } = game;
    players.forEach((player) => {
      const data: TypeResponseDataGame = {
        idGame,
        idPlayer: player.id,
      };

      const responseCreateGame: TypeResponseCreateGame = {
        type: CommandTypes.createGame,
        data: JSON.stringify(data),
        id: ID_VALUE,
      };
      if (player.ws) player.ws.send(JSON.stringify(responseCreateGame));
    });
    log(CommandTypes.createGame, `GameId: ${idGame}`, `RoomId: ${indexRoom}`);
  }
  return idGame;
};

export const startGame = (gameId: number) => {
  const { data } = searchShip(gameId) as TypeShip;
  data.forEach((item) => {
    const { id: currentPlayerIndex, ships, ws } = item as TypeShipData;
    const responseStartGame: TypeResponseStartGame = {
      type: CommandTypes.startGame,
      data: JSON.stringify({ ships, currentPlayerIndex }),
      id: ID_VALUE,
    };
    if (ws) ws.send(JSON.stringify(responseStartGame));
  });
  log(CommandTypes.startGame, `GameID: ${gameId}`);
};
