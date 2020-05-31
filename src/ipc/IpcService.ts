import { IpcChannelInterface, IpcResponse } from './IpcChannelInterface';
import { IpcRendererEvent } from 'electron';
const { ipcRenderer } = window.require('electron')

export const registerIPCChannel = <U extends Array<any>,V>(Channel: IpcChannelInterface<U, V>,
    msgSuccessCallback: (event: IpcRendererEvent, request: V) => void,
    ...messages: U
) => {
    Channel.send(messages);
    Channel.handleResponse(msgSuccessCallback);
}