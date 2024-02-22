import { createGame } from '../senders/game.sender';
import { updateRoom } from '../senders/room.sender';
import { addUserToRoom, searchPlayer } from '../services/player.service';
import { saveRoom } from '../services/room.service';
import { TypePlayer } from '../types/player.type';
import { TypeRequestAddUserToRoom, TypeRoom } from '../types/room.type';
import { players, rooms } from '../utils/constants';
import { WebSocket } from 'ws';

export const createRoomRequest = (ws: WebSocket): void => {
  const player = players.find((item) => item.ws === ws) as TypePlayer;
  const index = player.id;
  const { name } = searchPlayer(index) as TypePlayer;
  const isSave = saveRoom(name, index);
  isSave && updateRoom();
};

export const addUserToRoomRequest = (msg: string, ws: WebSocket): void => {
  const player = players.find((item) => item.ws === ws) as TypePlayer;
  const { data } = JSON.parse(msg) as TypeRequestAddUserToRoom;
  const { indexRoom } = JSON.parse(data as string) as { indexRoom: number };
  const isAdding = addUserToRoom(indexRoom, player.id);
  if (isAdding) {
    createGame(indexRoom);
    updateRoom();
  }
};
