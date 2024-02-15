import { WebSocket } from 'ws';
import { createPlayerResponse } from '../senders/player.sender';
import { updateRoom } from '../senders/room.sender';
import { savePlayer } from '../services/player.service';
import { TypeDataPlayerResponse, TypeRequestCreatePlayer } from '../types/player.type';
import { ErrorTextResponse } from '../utils/constants';

export const createPlayerRequest = (index: number, msg: string, ws: WebSocket) => {
  const { data } = JSON.parse(msg) as TypeRequestCreatePlayer;
  const { name } = JSON.parse(data as string);

  const isExist = savePlayer(index, name, ws);

  const dataRes: TypeDataPlayerResponse = {
    name,
    index,
    error: isExist,
    errorText: ErrorTextResponse.req,
  };
  createPlayerResponse(dataRes, ws);
  updateRoom();
};
