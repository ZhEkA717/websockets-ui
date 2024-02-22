import { WebSocket } from 'ws';
import { createPlayerResponse } from '../senders/player.sender';
import { updateRoom } from '../senders/room.sender';
import { savePlayer } from '../services/player.service';
import { TypeDataPlayerRequest, TypeDataPlayerResponse, TypeRequestCreatePlayer } from '../types/player.type';
import { ErrorTextResponse } from '../utils/constants';
import { saveWinner, updateWinners } from '../senders/updateWinners.sender';

export const createPlayerRequest = async (msg: string, ws: WebSocket) => {
  const { data } = JSON.parse(msg) as TypeRequestCreatePlayer;
  const { name, password } = JSON.parse(data as string) as TypeDataPlayerRequest;

  const { isExist, isPassword, id: index } = await savePlayer({ name, password }, ws);
  !isExist && !isPassword && saveWinner(index);

  const dataRes: TypeDataPlayerResponse = {
    name,
    index,
    error: isExist && !isPassword,
    errorText: ErrorTextResponse.req,
  };

  createPlayerResponse(dataRes, ws);
  updateRoom();
  updateWinners();
};
