import { TypePlayer } from '../types/player.type';
import { TypeRoom } from '../types/room.type';
import { CommandTypes, players, rooms } from '../utils/constants';
import { WebSocket } from 'ws';
import { log } from './log.service';

export const saveRoom = (name: string, index: number): boolean => {
  const isExist = searchRoomByIdPlayer(index);

  if (!isExist) {
    const roomId = new Date().valueOf();
    const roomUsers = [{ name, index }];
    rooms.push({ roomId, roomUsers });
    log(CommandTypes.createRoom, name, roomId.toString());
  }

  return !isExist;
};

export const deleteRoom = (id: number) => {
  const room = searchRoom(id);

  if (room) {
    const index = rooms.indexOf(room);
    rooms.splice(index, 1);
  }
};

export const deleteUserFromRoom = (ws: WebSocket) => {
  const player: TypePlayer | undefined = players.find((item) => item.ws === ws);
  const room = player && (searchRoomByIdPlayer(player?.id) as TypeRoom);
  if (player && room) {
    if (room.roomUsers.length === 2) {
      const playerInRoom = room.roomUsers.find((item) => item.index === player.id);
      const index = room.roomUsers.indexOf(playerInRoom as { name: string; index: number });
      room.roomUsers.splice(index, 1);
    } else {
      deleteRoom(room.roomId);
    }
  }
};

export const searchRoom = (id: number): TypeRoom | undefined => rooms.find((item) => item.roomId === id);

export const searchRoomByIdPlayer = (idPlayer: number): TypeRoom | undefined => {
  return rooms.find(({ roomUsers }) => {
    return roomUsers.find(({ index }) => index === idPlayer);
  });
};
