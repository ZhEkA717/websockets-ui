import { WebSocket } from 'ws';
import { CommandTypes, ID_TYPE } from '../utils/constants';

export type TypeRequestCreatePlayer = {
  type: CommandTypes.reg;
  data: string | TypeDataPlayerRequest;
  id: ID_TYPE;
};

export type TypeResponseCreatePlayer = {
  type: CommandTypes.reg;
  data: string | TypeDataPlayerResponse; // JSON.stringify(data: TypePlayerDataResponse)
  id: ID_TYPE;
};

export type TypeDataPlayerRequest = {
  name: string;
  password: string;
};

export type TypeDataPlayerResponse = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type TypePlayer = {
  id: number;
  name: string;
  password: string;
  ws: WebSocket;
};
