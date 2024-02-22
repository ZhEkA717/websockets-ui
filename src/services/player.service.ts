import { WebSocket } from 'ws';
import { TypeDataPlayerRequest, TypePlayer } from '../types/player.type';
import { CommandTypes, players } from '../utils/constants';
import { TypeRoom } from '../types/room.type';
import { searchRoom } from './room.service';
import bcrypt from 'bcryptjs';
import { log } from './log.service';

export const searchPlayer = (id: number): TypePlayer | undefined => players.find((item) => item.id === id);

export const deletePlayer = (id: number) => {
  const player: TypePlayer | undefined = searchPlayer(id);

  if (player) {
    const index: number = players.indexOf(player);
    players.splice(index, 1);
  }
};

export const savePlayer = async (
  data: TypeDataPlayerRequest,
  ws: WebSocket,
): Promise<{
  id: number;
  isExist: boolean;
  isPassword: boolean;
}> => {
  const { name, password } = data;
  const isExist: TypePlayer | undefined = players.find((item) => item.name === name);
  const isPassword = isExist && (await bcrypt.compare(password, isExist.password));
  let id: number;
  if (!isExist && !isPassword) {
    id = new Date().valueOf();
    const encryptedPassword = await bcrypt.hash(password, 10);
    players.push({ id, name, password: encryptedPassword, ws });
  } else {
    id = isExist.id;
    isExist.ws.close();
    isExist.ws = ws;
  }

  return {
    id,
    isExist: !!isExist,
    isPassword: !!isPassword,
  };
};

export const addUserToRoom = (indexRoom: number, playerId: number) => {
  const { roomUsers } = searchRoom(indexRoom) as TypeRoom;
  const { name, id: index } = searchPlayer(playerId) as TypePlayer;
  const length = roomUsers.length;
  const isExist = roomUsers.find((item) => item.index === playerId);
  if (length < 2 && !isExist) {
    roomUsers.push({ name, index });
    log(CommandTypes.addUserToRoom, name, index.toString());
    return true;
  }
  return false;
};
