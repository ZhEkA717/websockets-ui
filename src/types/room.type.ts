import { CommandTypes, ID_TYPE } from '../utils/constants';

export type TypeRequestCreateRoom = {
  type: CommandTypes.createRoom;
  data: string;
  id: ID_TYPE;
};

export type TypeResponseUpdateRoom = {
  type: CommandTypes.updateRoom;
  data: TypeRoom[] | string;
  id: ID_TYPE;
};

export type TypeRoom = {
  roomId: number;
  roomUsers: {
    name: string;
    index: number;
  }[];
};

export type TypeRequestAddUserToRoom = {
  type: CommandTypes.addUserToRoom;
  data: {
    indexRoom: number;
  } | string;
  id: ID_TYPE;
};