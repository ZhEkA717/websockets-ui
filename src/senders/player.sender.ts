import { WebSocket } from 'ws';
import { TypeDataPlayerResponse, TypeResponseCreatePlayer } from '../types/player.type';
import { CommandTypes, ID_VALUE } from '../utils/constants';
import { log } from '../services/log.service';

export const createPlayerResponse = (data: TypeDataPlayerResponse, ws: WebSocket) => {
  const res: TypeResponseCreatePlayer = {
    type: CommandTypes.reg,
    data: JSON.stringify(data),
    id: ID_VALUE,
  };

  ws.send(JSON.stringify(res));

  log(CommandTypes.reg, data.name, data.index);
};
