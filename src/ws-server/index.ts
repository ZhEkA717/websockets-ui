import ws, { WebSocket } from 'ws';
import { CommandTypes, PORT } from '../utils/constants';
import { deletePlayer } from '../services/player.service';
import { updateRoom } from '../senders/room.sender';
import { deleteRoom } from '../services/room.service';
import { addUserToRoomRequest, createRoomRequest } from '../handlers/room.handler';
import { createPlayerRequest } from '../handlers/player.handler';
import { addShipRequest } from '../handlers/ship.handler';

export const createWebsocketServer = () => {
  const { Server } = ws;

  const wss = new Server({ port: PORT }, () => {
    console.log(`Server started on Port: ${PORT}`);
  });

  wss.on('connection', (ws: WebSocket) => {
    const playerId: number = new Date().valueOf();
    const roomId = new Date().valueOf();

    console.log(`Connection player ${playerId}`);

    ws.on('message', (msg: string) => {
      const { type } = JSON.parse(msg);
      switch (type) {
        case CommandTypes.reg:
          createPlayerRequest(playerId, msg, ws);
          break;
        case CommandTypes.createRoom:
          createRoomRequest(playerId, roomId);
          break;
        case CommandTypes.addUserToRoom:
          addUserToRoomRequest(playerId, msg);
          break;
        case CommandTypes.addShips:
          addShipRequest(playerId, msg);
          break;
      }
    });

    ws.on('close', () => {
      deletePlayer(playerId);
      deleteRoom(roomId);
      updateRoom();
      console.log(`Client ${playerId} disconnected`);
    });
  });
};
