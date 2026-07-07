import { app, BrowserWindow, dialog, globalShortcut, shell } from 'electron';
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

    // 窗口一出生，立刻登记 ID
    this.aliveWindowIds.add(win.id);

    // 定义你要拦截的快捷键
    const DEV_TOOLS_SHORTCUT = 'CommandOrControl+Alt+I';

    // 1. 获得焦点时：抢占系统快捷键
    win.on('focus', () => {
      const isSuccess = globalShortcut.register(DEV_TOOLS_SHORTCUT, () => {
        if (win.webContents.isDevToolsOpened()) {
          win.webContents.closeDevTools();
        } else {
          win.webContents.openDevTools({ mode: 'detach' });
        }
      });

      if (!isSuccess) {
        console.error(`窗口 [${name}] 注册快捷键失败: ${DEV_TOOLS_SHORTCUT}`);
      }
    });

    win.on('blur', () => {
      globalShortcut.unregister(DEV_TOOLS_SHORTCUT);
    });

    const { webContents } = win;
    // 拦截渲染进程的部分跳转
    webContents.on('will-navigate', (event, url) => {
      // 允许本地开发地址或特定的内网地址
      if (
        url.startsWith('http://127.0.0.1') ||
        url.startsWith('https://liuqi.cool')
      ) {
        return; // 正常放行
      }

      // 拦截其他所有外部跳转
      event.preventDefault();
      console.log(`[安全管控] 已拦截非法路由跳转: ${url}`);

      // 可选方案：将拦截下的合法外链交由用户的默认浏览器（如 Chrome/Edge）打开
      shell.openExternal(url);
    });

    // 生命周期统一管理
    win.on('closed', () => {
      this.windows.delete(name);
      globalShortcut.unregister(DEV_TOOLS_SHORTCUT);
    });

    // 监听进程彻底崩溃
    win.webContents.on('render-process-gone', (event, details) => {
      console.error(`窗口 [${name}] 崩溃了！原因: ${details.reason}`);

      // 典型的处理策略：销毁旧窗口，提示用户，或者自动重启
      this.aliveWindowIds.delete(win.id);
      this.windows.delete(name);
      win.destroy();
      // this.createWindow(name, options); // 是否需要自动重启看业务需求
    });

    // 监听页面无响应 (卡死)
    win.on('unresponsive', () => {
      console.warn(`窗口 [${name}] 无响应，可能 JS 线程被阻塞`);
      // 可以弹出一个系统原生对话框，询问用户是否强制关闭
      // 核心改动：改用 showMessageBoxSync 同步方法
      // 注意第一个参数传入 win，让对话框成为该窗口的模态(Modal)对话框，体验更好
      const response = dialog.showMessageBoxSync(win, {
        title: '确认强制关闭',
        message: `窗口 [${name}] 无响应，是否强制关闭？`,
        type: 'warning',
        buttons: ['取消', '强制关闭'],
      });

      // 代码会在这里暂停，直到用户点击按钮
      if (response === 1) {
        // 1 代表点击了 '强制关闭'
        // JS 线程恢复执行的第一顺位，立刻“注销户口”
        this.aliveWindowIds.delete(win.id);
        this.windows.delete(name);

        // 物理毁灭
        win.destroy();
      }
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
