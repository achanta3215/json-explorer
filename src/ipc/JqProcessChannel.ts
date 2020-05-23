import { IpcMainEvent, IpcRendererEvent } from 'electron';
import { IpcChannelInterface, IpcRequest, IpcResponse } from './IpcChannelInterface';
const { ipcRenderer } =  typeof window !== 'undefined'
  ? window.require('electron') : require('electron')
const { spawn } = require('child_process');


export class JqProcessChannel
 implements IpcChannelInterface<string, string> {
  getName(): string {
    return 'jq-process';
  }
  getResponseName(): string {
    return `${this.getName()}-response`;
  }

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    console.log(request.message)
    if (!request.responseChannel) {
      request.responseChannel = this.getResponseName();
    }
    event.returnValue = 'pong';
    const echoProcess = spawn('echo', [`${request.message}`]);
    const jsonProcess = spawn("jq", ["."]);

    echoProcess.stdout.pipe(jsonProcess.stdin);

    jsonProcess.stdout.on('data', data => {
      console.log(`Formatted JSON ${data}`);
      event.reply(this.getResponseName(), `${data}`);
    });
  }

  send(message: string) {
    const request: IpcRequest<string> = {
      message,
    };
    ipcRenderer.send(this.getName(), request);
  }

  handleResponse(
    msgSuccessCallback: (event: IpcRendererEvent, request: string) => void,
  ) {
    ipcRenderer.on(this.getResponseName(), msgSuccessCallback);
  }

  
}