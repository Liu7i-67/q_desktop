import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
});
