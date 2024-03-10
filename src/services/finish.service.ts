import { validate } from 'uuid';
import { TypeGame } from '../types/game.type';
import { TypePlayer } from '../types/player.type';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { CommandTypes, ID_VALUE, games, players } from '../utils/constants';
import { searchShip } from './ship.service';
import { TypeFinishResponse } from '../types/finish.type';
import { WebSocket } from 'ws';

export const isFinish = (gameId: number) => {
  const shipsInGame: TypeShip | undefined = searchShip(gameId);

  const [player1, player2] = shipsInGame?.data as TypeShipData[];

  return player1.shipsAlive === 0 || player2.shipsAlive === 0;
};

export const autoFinish = (ws: WebSocket) => {
  console.log('autoFinish');
  const player = players.find(item => item.ws === ws) as TypePlayer;

  if (player) {
    const game: TypeGame | undefined = games.find(game => {
      return game.players.find(item => item.id === player.id);
    });

    if (game) {
      const winPlayer = game.players.find(item => item.id !== player.id);
      if (winPlayer && !validate(winPlayer?.name)) {
        winPlayer && game.players.forEach(({ ws }) => {
          ws?.send(getFinishResponse(winPlayer.id));
        });
      }
    }
  }
}

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
