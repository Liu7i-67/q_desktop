import { app, BrowserWindow, WebContentsView } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { IGloablStore, IWebView } from './interface.js';
import { windowResize } from './tools/index.js';
import { updateMenu } from './menu.js';
import { autoUpdateApp } from './update.js';

const store: IGloablStore = {
  windowList: [],
  activeWindow: '',
};

app.on('ready', () => {
  const width = 400;
  const height = 400;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    title: 'OA',
  });

  const viewList: IWebView[] = [];
  const view1 = new WebContentsView();
  const id = Date.now();
  viewList.push({
    id: `view_${id}`,
    view: view1,
    title: 'OA',
  });
  mainWindow.contentView.addChildView(view1);

  if (isDev()) {
    view1.webContents.loadURL('http://127.0.0.1:5677');
  } else {
    view1.webContents.loadFile(
      path.join(app.getAppPath() + '/dist/web/index.html'),
    );
  }

  view1.setBounds({ x: 0, y: 0, width, height });

  store.windowList.push({
    window: mainWindow,
    id: `window_${id}`,
    visible: true,
    viewList,
    activeView: `view_${id}`,
    width,
    height,
  });
  store.activeWindow = `window_${id}`;
  updateMenu(store);
  autoUpdateApp();
  // 监听窗口大小变化
  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize();
    windowResize(width, height, store);
  });
});
