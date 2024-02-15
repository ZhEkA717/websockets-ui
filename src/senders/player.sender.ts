import { WebSocket } from 'ws';
import { TypeDataPlayerResponse, TypeResponseCreatePlayer } from '../types/player.type';
import { CommandTypes, ID_VALUE } from '../utils/constants';

export const createPlayerResponse = (data: TypeDataPlayerResponse, ws: WebSocket) => {
  const res: TypeResponseCreatePlayer = {
    type: CommandTypes.reg,
    data: JSON.stringify(data),
    id: ID_VALUE,
  };

  ws.send(JSON.stringify(res));
};
