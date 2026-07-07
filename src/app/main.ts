import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import { isDev } from './utils/index.js';
import { handleFilePath, handleUrl } from './utils/index.js';
import { windowManager } from './windowManager.js';

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

app.on('browser-window-blur', (event, window) => {
  console.log(new Date().toLocaleTimeString(), 'browser-window-blur');
  console.log(
    window.id,
    window.title,
    windowManager.isWindowAlive(window.id) ? '存活' : '已销毁',
  );
});

app.on('browser-window-focus', (event, window) => {
  console.log(new Date().toLocaleTimeString(), 'browser-window-focus');
  console.log(
    window.id,
    window.title,
    windowManager.isWindowAlive(window.id) ? '存活' : '已销毁',
  );
});
app.on('browser-window-created', (event, window) => {
  console.log(new Date().toLocaleTimeString(), 'browser-window-created');
  console.log(window.id, window.title);
  window.on('page-title-updated', (event) => {
    event.preventDefault();
  });
});

app.whenReady().then(() => {
  console.log('whenReady');

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline'",
        ],
      },
    });
  });

  mainWindow = windowManager.createWindow('main', {});

  // let subwindow = windowManager.createWindow('sub', {
  //   title: '子窗口',
  // });

  // if (isDev()) {
  //   subwindow.loadURL('http://127.0.0.1:5677');
  // } else {
  //   subwindow.loadFile(path.join(app.getAppPath() + '/dist/web/index.html'));
  // }

  if (isDev()) {
    mainWindow.loadURL('http://127.0.0.1:5677');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist/web/index.html'));
  }
});
