import { IpcMainEvent, IpcRendererEvent } from 'electron';

export interface IpcRequest<T> {
  responseChannel?: string;
  messages: T;
}

export interface IpcResponse<U> {
  message: U;
}

export interface IpcChannelInterface<T, U> {
  getName(): string;

  handle(event: IpcMainEvent, request: IpcRequest<T>): void;
  handleResponse(
    msgSuccessCallback: (event: IpcRendererEvent, request: U) => void
  ): void;
  send(message: T): void;
}