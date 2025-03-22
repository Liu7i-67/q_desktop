import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils.js';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});

  if (isDev()) {
    mainWindow.loadURL('http://127.0.0.1:5677');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist/web/index.html'));
  }
});
