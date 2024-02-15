import { WebSocket } from 'ws';
import { CommandTypes } from '../utils/constants';

export type TypeRequestCreatePlayer = {
  type: CommandTypes.reg;
  data: string | TypeDataPlayerRequest;
  id: 0;
};

export type TypeResponseCreatePlayer = {
  type: CommandTypes.reg;
  data: string | TypeDataPlayerResponse; // JSON.stringify(data: TypePlayerDataResponse)
  id: 0;
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
  ws: WebSocket;
};
