import { contextBridge, ipcRenderer, IpcRendererEvent, safeStorage } from 'electron';
import { downloadAndExtractRepo } from './utils/git';
import fs from 'fs';
import { loadSchemaFromConfigDir } from './utils/graphql-schema';

const electronExports = {
  onGithubAuthenticated: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('authenticated', callback),
  decryptString: (encryptedString: string) => safeStorage.decryptString(Buffer.from(encryptedString, 'hex')),
  encryptString: (string: string) => safeStorage.encryptString(string).toString('hex'),
  clientIDs: {} as Record<string, { id: string, secret: string }>,
  downloadAndExtractRepo: async (url: string, token: string) => downloadAndExtractRepo(url, token),
  loadSchema: async (configDirPath: string) => loadSchemaFromConfigDir(configDirPath)
};

// check if graphql-diagram.json exists in the current directory and load it if it does
if (fs.existsSync('graphql-diagram.json')) {
  const config = JSON.parse(fs.readFileSync('graphql-diagram.json', 'utf8'));
  electronExports.clientIDs = config;
}


contextBridge.exposeInMainWorld('electron', electronExports);

declare global {
    interface Window {
        electron: typeof electronExports;
    }
}