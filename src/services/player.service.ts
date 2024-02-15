import { WebSocket } from 'ws';
import { TypePlayer } from '../types/player.type';
import { players } from '../utils/constants';
import { TypeRoom } from '../types/room.type';
import { searchRoom } from './room.service';

export const searchPlayer = (id: number): TypePlayer | undefined => players.find((item) => item.id === id);

export const deletePlayer = (id: number) => {
  const player: TypePlayer | undefined = searchPlayer(id);

  if (player) {
    const index: number = players.indexOf(player);
    players.splice(index, 1);
  }
};

export const savePlayer = (id: number, name: string, ws: WebSocket): boolean => {
  const isExist: TypePlayer | undefined = players.find(item => item.name === name);

  if (!isExist) players.push({ id, name, ws });
  return !!isExist;
};

export const addUserToRoom = (indexRoom: number, playerId: number) => {
  const { roomUsers } = searchRoom(indexRoom) as TypeRoom;
  const { name, id: index } = searchPlayer(playerId) as TypePlayer;
  const length = roomUsers.length;
  const isExist = roomUsers.find(item => item.index === playerId);
  if (length < 2 && !isExist) {
    roomUsers.push({ name, index });
    return true;
  }
  return false;
};
