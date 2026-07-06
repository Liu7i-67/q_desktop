import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';

class WindowManager {
  private windows = new Map<string, BrowserWindow>();
  // 新增：专门维护存活窗口 ID 的集合（我们的绝对真理）
  private aliveWindowIds = new Set<number>();

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

    // 1. 窗口一出生，立刻登记 ID
    this.aliveWindowIds.add(win.id);

    // 3. 生命周期统一管理
    win.on('closed', () => {
      this.windows.delete(name);
    });

    // 1. 监听进程彻底崩溃
    win.webContents.on('render-process-gone', (event, details) => {
      console.error(`窗口 [${name}] 崩溃了！原因: ${details.reason}`);

      // 典型的处理策略：销毁旧窗口，提示用户，或者自动重启
      this.aliveWindowIds.delete(win.id);
      this.windows.delete(name);
      win.destroy();
      // this.createWindow(name, options); // 是否需要自动重启看业务需求
    });

    // 2. 监听页面无响应 (卡死)
    win.on('unresponsive', () => {
      console.warn(`窗口 [${name}] 无响应，可能 JS 线程被阻塞`);
      // 可以弹出一个系统原生对话框，询问用户是否强制关闭
      dialog
        .showMessageBox({
          title: '确认强制关闭',
          message: `窗口 [${name}] 无响应，是否强制关闭？`,
          type: 'warning',
          buttons: ['取消', '强制关闭'],
        })
        .then((result) => {
          if (result.response === 1) {
            this.aliveWindowIds.delete(win.id);
            this.windows.delete(name);
            win.destroy();
          }
        });
    });

    // 3. 监听恢复响应
    win.on('responsive', () => {
      // 核心防御：如果窗口已经被强制销毁（或正在销毁），直接拦截，不视为“正常恢复”
      if (win.isDestroyed() || !this.aliveWindowIds.has(win.id)) return;
      console.log(`窗口 [${name}] 恢复正常`);
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

  public isWindowAlive(windowId: number): boolean {
    return this.aliveWindowIds.has(windowId);
  }
}

export const windowManager = new WindowManager();
