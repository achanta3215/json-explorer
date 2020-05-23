import { IpcChannelInterface, IpcResponse } from './IpcChannelInterface';
import { IpcRendererEvent } from 'electron';
const { ipcRenderer } = window.require('electron')

export const registerIPCChannel = <U,V>(Channel: IpcChannelInterface<U, V>,
    msg: U,
    msgSuccessCallback: (event: IpcRendererEvent, request: V) => void,
) => {
    Channel.send(msg);
    Channel.handleResponse(msgSuccessCallback);
}