import { WebSocket } from 'ws';
import { TypePlayerDataResponse, TypeRequestCreatePlayer, TypeResponseCreatePlayer } from '../types/player';
import { ErrorTextResponse } from '../utils/constants';
import { savePlayer } from '../services/player.service';

export const createPlayer = (index: number, msg: string, ws: WebSocket) => {
  const { type, data, id } = JSON.parse(msg) as TypeRequestCreatePlayer;
  const { name } = JSON.parse(data as string);

  const isExist = savePlayer(index, name, ws);

  const dataRes: TypePlayerDataResponse = {
    name,
    index,
    error: isExist,
    errorText: ErrorTextResponse.req,
  };
  const res: TypeResponseCreatePlayer = {
    type,
    data: JSON.stringify(dataRes),
    id,
  };

  ws.send(JSON.stringify(res));
};


