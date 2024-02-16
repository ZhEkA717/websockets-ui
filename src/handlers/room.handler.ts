import { createGame } from '../senders/game.sender';
import { updateRoom } from '../senders/room.sender';
import { addUserToRoom, searchPlayer } from '../services/player.service';
import { saveRoom } from '../services/room.service';
import { TypePlayer } from '../types/player.type';
import { TypeRequestAddUserToRoom, TypeRoom } from '../types/room.type';

export const createRoomRequest = (index: number, roomId: number): void => {
  const { name } = searchPlayer(index) as TypePlayer;
  const roomUsers = [{ name, index }];
  const newRoom: TypeRoom = { roomId, roomUsers };
  const isSave = saveRoom(newRoom);
  isSave && updateRoom();
};

export const addUserToRoomRequest = (playerId: number, msg: string): void => {
  const { data } = JSON.parse(msg) as TypeRequestAddUserToRoom;
  const { indexRoom } = JSON.parse(data as string);
  const isAdding = addUserToRoom(indexRoom, playerId);
  if (isAdding) {
    createGame(indexRoom);
    updateRoom();
  }
};
