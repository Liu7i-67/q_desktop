import path from 'path';

export const handleFilePath = (filePath: string) => {
  if (!filePath) return;

  // 使用 path.resolve 将其强制转换为绝对路径
  // 如果输入已经是绝对路径，它不会有任何副作用
  const absolutePath = path.resolve(filePath);

  console.log('处理后的绝对路径:', absolutePath);
  // 这里调用你之前的 handleOpenFile 逻辑
};

export const handleUrl = (url: string) => {
  console.log('接收到 URL:', url);
};

/** @function 是否为开发环境 */
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}
