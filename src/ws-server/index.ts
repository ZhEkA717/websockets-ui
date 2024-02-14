import ws, { WebSocket } from 'ws';
import { ListCommand, PORT } from '../utils/constants';
import {  deletePlayer } from '../services/player.service';
import { createPlayer } from '../senders/player.sender';

export const createWebsocketServer = () => {
  const { Server } = ws;

  const wss = new Server({ port: PORT }, () => {
    console.log(`Server started on Port: ${PORT}`);
  });

  wss.on('connection', (ws: WebSocket) => {
    console.log('connection');

    const index: number = new Date().valueOf();


    ws.on('message', (msg: string) => {
      const { type } = JSON.parse(msg);
      switch (type) {
        case ListCommand.reg:
          createPlayer(index, msg, ws);
          break;
      }
    });

    ws.on('close', () => {
        deletePlayer(index);
        console.log(`Client ${index} disconnected`);
      });
  });
};
