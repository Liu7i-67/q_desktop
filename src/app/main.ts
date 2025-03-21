import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(path.join(app.getAppPath() + '/dist/web/index.html'));
});
