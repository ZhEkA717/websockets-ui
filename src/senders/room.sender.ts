import { log } from '../services/log.service';
import { TypeResponseUpdateRoom } from '../types/room.type';
import { CommandTypes, ID_VALUE, players, rooms } from '../utils/constants';
import { validate } from 'uuid';

export const updateRoom = () => {
  const roomsWithOnePlayer = rooms
    .filter((item) => item.roomUsers.length === 1)
    .filter((item) => !validate(item.roomUsers[0].name));

  const responseUpdateRoom: TypeResponseUpdateRoom = {
    type: CommandTypes.updateRoom,
    data: JSON.stringify(roomsWithOnePlayer),
    id: ID_VALUE,
  };

  players?.forEach(({ ws }) => {
    ws?.send(JSON.stringify(responseUpdateRoom));
  });

  log(CommandTypes.updateRoom);
};
