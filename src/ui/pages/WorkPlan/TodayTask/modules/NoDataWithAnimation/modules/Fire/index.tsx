import React, { useEffect, useRef } from "react";
import { IRectangle, onDrawRectangle, onGenerateRectangles } from "./tool";

export interface IFireProps {}

const Fire: React.FC<IFireProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectanglesRef = useRef<IRectangle[]>([]);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectanglesRef.current = rectanglesRef.current.filter(
      (rect) => rect.opacity > 0.01
    );

    rectanglesRef.current.forEach((rect) => {
      // 更新位置
      rect.x += rect.velocity.x;
      rect.y += rect.velocity.y;
      rect.velocity.y += rect.gravity;
      rect.opacity *= 0.99;

      // 绘制
      onDrawRectangle(ctx, rect);
    });

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    // 初始生成矩形
    rectanglesRef.current = onGenerateRectangles(canvas, 160);

    // 启动动画
    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Fire;
