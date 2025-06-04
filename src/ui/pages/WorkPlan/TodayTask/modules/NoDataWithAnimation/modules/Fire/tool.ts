export interface IRectangle {
  /**@param 2D旋转x轴旋转角度 */
  x: number;
  /**@param 2D旋转y轴旋转角度 */
  y: number;
  /**@param 矩形宽度 */
  width: number;
  /**@param 矩形高度 */
  height: number;
  /**@param 3D旋转角度 */
  rotation: number;
  /**@param 矩形颜色 */
  color: string;
  /**@param 矩形运动速度配置，x轴y轴 */
  velocity: {
    x: number;
    y: number;
  };
  /**@param 重力配置，值越大下坠的越快（模拟烟花下坠效果） */
  gravity: number;
  /**@param 透明度配置 */
  opacity: number;
}

/**@function 绘制单个矩形，随机大小、旋转角度 */
export const onDrawRectangle = (
  ctx: CanvasRenderingContext2D,
  rect: IRectangle
) => {
  ctx.save();
  ctx.translate(rect.x, rect.y);
  ctx.rotate(rect.rotation);
  ctx.globalAlpha = rect.opacity;
  ctx.fillStyle = rect.color;
  ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
  ctx.restore();
};

/**@function 生成指定个数的随机矩形 */
export const onGenerateRectangles = (
  canvas: HTMLCanvasElement,
  length: number
): IRectangle[] => {
  const rects: IRectangle[] = [];

  for (let i = 0; i < length; i++) {
    // 矩形的初始位置
    const initX = canvas.width / 2;
    const initY = 0;

    rects.push({
      x: initX,
      y: initY,
      width: Math.random() * 2 + 10,
      height: Math.random() * 2 + 10,
      rotation: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      velocity: onCaclRuning(i, length),
      gravity: 0.1,
      opacity: 1,
    });
  }
  return rects;
};

/**
 * @function 矩形下落轨迹处理
 * 将烟花矩形分成三份，第一份和第三份下落时，x轴的位移更大
 * 第二份下落时，y轴的位移更大
 */
export const onCaclRuning = (index: number, total: number) => {
  const range = Math.floor(total / 3);
  // x、y的运动轨迹默认为下面的值
  let xRuning = (Math.random() - 0.5) * 10;
  let yRuning = (Math.random() - 0.5) * 10;

  if (index < range) {
    xRuning = (Math.random() - 1) * 10;
  } else if (index > range * 2) {
    xRuning = (Math.random() + 0.5) * 10;
  }

  return {
    x: xRuning,
    y: yRuning,
  };
};
