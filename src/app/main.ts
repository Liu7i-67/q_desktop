import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { handleFilePath, handleUrl } from './utils/index.js';

let mainWindow: BrowserWindow;

app.on('will-finish-launching', () => {
  console.log(0, 'will-finish-launching');
  app.setName('LQ');
});

app.on('before-quit', (event) => {
  console.log('before-quit');
});

app.on('will-quit', (event) => {
  console.log('will-quit');
});

app.on('quit', (event) => {
  console.log('quit');
});

app.on('window-all-closed', () => {
  console.log('window-all-closed 所有窗口都已被关闭');
  app.quit();
});

app.on('open-file', (event, filePath) => {
  event.preventDefault();
  handleFilePath(filePath);
});

app.on('open-url', (event, url) => {
  event.preventDefault();
  handleUrl(url);
});

if (app.requestSingleInstanceLock()) {
  app.on('second-instance', (event, argv) => {
    console.log('second-instance', argv);
    // 找到参数中包含文件路径的那一项
    const filePath = argv.find((arg) => arg.endsWith('.txt'));
    if (filePath) handleFilePath(filePath);

    const url = argv.find((arg) => arg.startsWith('myapp://'));
    if (url) handleUrl(url);
  });
}

app.on('ready', () => {
  console.log(1, 'ready');
  console.log(2, app.getName());
});

app.whenReady().then(() => {
  console.log('whenReady');
  mainWindow = new BrowserWindow({});

  if (isDev()) {
    mainWindow.loadURL('http://127.0.0.1:5677');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist/web/index.html'));
  }
});
