import { useEffect, useState } from "react";

/**
 * @useTargetSize 监听指定元素的宽高
 * @target 监听的元素,默认监听整个页面
 *
 * @returns 当监听的元素宽高
 */
const useTargetSize = (
  target: Element | null = document.body
): {
  width: number;
  height: number;
} => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        setWindowSize({
          width: cr.width,
          height: cr.height,
        });
      }
    });
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target]);

  return windowSize;
};

export default useTargetSize;
