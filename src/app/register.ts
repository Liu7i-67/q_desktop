import { BrowserWindow, globalShortcut } from 'electron';
import { IGloablStore } from './interface.js';

/** @function 注册快捷键 */
export const globalRegister = (store: IGloablStore) => {
  /** @function 打开调试面板 */
  globalShortcut.register('CmdOrCtrl+I', () => {
    const window = store.windowList.find((w) => w.id === store.activeWindow);
    if (!window) {
      return;
    }
    const view = window.viewList.find((v) => v.id === window.activeView);
    if (!view) {
      window.window.webContents.openDevTools();
      return;
    }

    view.view.webContents.openDevTools();
  });
};
