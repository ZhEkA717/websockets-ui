import { WebSocket } from 'ws';

export type TypeRequestCreatePlayer = {
  type: 'reg';
  data: string | TypePlayerDataRequest;
  id: 0;
};

export type TypeResponseCreatePlayer = {
  type: 'reg';
  data: string | TypePlayerDataResponse; // JSON.stringify(data: TypePlayerDataResponse)
  id: 0;
};

export type TypePlayerDataRequest = {
  name: string;
  password: string;
};

export type TypePlayerDataResponse = {
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
