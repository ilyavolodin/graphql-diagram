// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, IpcRenderer, IpcRendererEvent } from "electron";

const electronExports = {
  onGithubAuthenticated: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('authenticated', callback)
};

contextBridge.exposeInMainWorld('electron', electronExports);

declare global {
    interface Window {
        electron: typeof electronExports;
    }
}