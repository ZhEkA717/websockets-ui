import { TypeRoom } from '../types/room.type';
import { rooms } from '../utils/constants';

export const saveRoom = (room: TypeRoom): boolean => {
  const { roomId } = room;

  const isExist = searchRoom(roomId);

  if (!isExist) rooms.push(room);

  return !isExist;
};

export const deleteRoom = (id: number) => {
  const room = searchRoom(id);

  if (room) {
    const index = rooms.indexOf(room);
    rooms.splice(index, 1);
  }
};

export const searchRoom = (id: number): TypeRoom | undefined => rooms.find((item) => item.roomId === id);
