import ws, { WebSocket } from 'ws';
import { CommandTypes, PORT } from '../utils/constants';
import { updateRoom } from '../senders/room.sender';
import { addUserToRoomRequest, createRoomRequest } from '../handlers/room.handler';
import { createPlayerRequest } from '../handlers/player.handler';
import { addShipRequest } from '../handlers/ship.handler';
import { attackRequest, randomAttackRequest } from '../handlers/attack.handler';
import { deleteUserFromRoom } from '../services/room.service';
import { singlePlayRequest } from '../handlers/singlePlay.handler';
import { autoFinish } from '../services/finish.service';

export const createWebsocketServer = () => {
  const { Server } = ws;

  const wss = new Server({ port: PORT }, () => {
    console.log(`Server started on Port: ${PORT}`);
  });

  wss.on('connection', (ws: WebSocket) => {
    const idSocket = new Date().valueOf();
    console.log(`New socket connection. Id socket: ${idSocket}`);

    ws.on('message', (msg: string) => {
      const { type } = JSON.parse(msg);
      switch (type) {
        case CommandTypes.reg:
          createPlayerRequest(msg, ws);
          break;
        case CommandTypes.createRoom:
          createRoomRequest(ws);
          break;
        case CommandTypes.addUserToRoom:
          addUserToRoomRequest(msg, ws);
          break;
        case CommandTypes.addShips:
          addShipRequest(msg);
          break;
        case CommandTypes.attack:
          attackRequest(msg);
          break;
        case CommandTypes.randomAttack:
          randomAttackRequest(msg);
          break;
        case CommandTypes.singlePlay:
          singlePlayRequest(msg, ws);
          break;
      }
    });

    ws.on('close', (_closeCode: number) => {
      console.log(`Old socket disconnection. id: ${idSocket}`);
      deleteUserFromRoom(ws);
      autoFinish(ws);
      updateRoom();
    });
  });
};