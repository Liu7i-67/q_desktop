import { app, BrowserWindow } from 'electron';
import path from 'path';

class WindowManager {
  private windows = new Map<string, BrowserWindow>();

  // 统一的创建入口
  public createWindow(name: string, options: any) {
    // 1. 防抖与单例拦截
    if (this.windows.has(name)) {
      const win = this.windows.get(name)!;
      if (win.isMinimized()) win.restore();
      win.focus();
      return win;
    }

    // 2. 注入全局安全与默认配置
    const defaultOptions = {
      webPreferences: {
        preload: path.join(app.getAppPath(), 'dist/app/preload.cjs'),
        contextIsolation: true,
      },
    };
    const win = new BrowserWindow({ ...defaultOptions, ...options });

    // 3. 生命周期统一管理
    win.on('closed', () => {
      this.windows.delete(name);
    });

    this.windows.set(name, win);
    return win;
  }

  // 窗口间路由转发
  public sendTo(targetName: string, channel: string, ...args: any[]) {
    const targetWin = this.windows.get(targetName);
    if (targetWin) {
      targetWin.webContents.send(channel, ...args);
    }
  }

  // 全局广播
  public broadcast(channel: string, ...args: any[]) {
    this.windows.forEach((win) => {
      if (!win.isDestroyed()) {
        win.webContents.send(channel, ...args);
      }
    });
  }
}

export const windowManager = new WindowManager();
