import ws, { WebSocket } from 'ws';
import { CommandTypes, PORT } from '../utils/constants';
import {  deletePlayer } from '../services/player.service';
import { createPlayer } from '../senders/player.sender';
import { createRoom, updateRoom } from '../senders/room.sender';
import { deleteRoom } from '../services/room.service';

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
          createPlayer(playerId, msg, ws);
          break;
        case CommandTypes.createRoom:
          createRoom(playerId, roomId);
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