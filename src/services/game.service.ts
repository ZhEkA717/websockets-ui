import { WebSocket } from 'ws';
import { searchRoom } from '../services/room.service';
import { games, players } from '../utils/constants';
import { TypeGame } from '../types/game.type';

export const getWsFromRoom = (indexRoom: number): WebSocket[] => {
  const room = searchRoom(indexRoom);
  const [player1, player2] = room?.roomUsers as {
    name: string;
    index: number;
  }[];

  return players.filter((item) => item.id === player1.index || item.id === player2.index).map((item) => item.ws);
};

export const saveGame = (game: TypeGame) => {
    games.push(game);
}
