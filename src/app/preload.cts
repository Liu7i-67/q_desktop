const { contextBridge, ipcRenderer } = require('electron');

const api = {
  // 单向通信：仅发送给主进程，不等待返回 (例如：窗口最小化、埋点上报)
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args);
  },

  // 双向通信：调用主进程方法并等待 Promise 结果 (例如：读取本地文件、查数据库)
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },

  // 监听通信：接收主进程主动推送的消息 (例如：系统通知、硬件状态上报)
  on: (channel: string, callback: (...args: any[]) => void) => {
    // 拦截底层的 event 对象，只把核心参数传给前端，防止底层 IPC 接口泄漏
    const subscription = (_event: any, ...args: any[]) => callback(...args);
    ipcRenderer.on(channel, subscription);
    // 闭包返回一个清理函数，方便前端在组件销毁时调用，防止多次挂载导致内存泄漏
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

// 将封装好的 api 挂载到浏览器的 window.electron 对象上
contextBridge.exposeInMainWorld('__epi__', api);
