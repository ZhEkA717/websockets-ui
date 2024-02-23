import { searchRoom } from '../services/room.service';
import { games, players } from '../utils/constants';
import { TypeGame } from '../types/game.type';
import { TypePlayer } from '../types/player.type';

export const getPlayerFromRoom = (indexRoom: number): TypePlayer[] => {
  const room = searchRoom(indexRoom);
  const [player1, player2] = room?.roomUsers as {
    name: string;
    index: number;
  }[];

  return players.filter((item) => item.id === player1.index || item.id === player2.index);
};

export const saveGame = (idGame: number, players: TypePlayer[]) => {
  const game: TypeGame = { idGame, players };
  games.push(game);
};

export const deleteGame = (idGame: number) => {
  const game = games.find(item => item.idGame === idGame);
  const index = games.indexOf(game as TypeGame);
  games.splice(index, 1);
}