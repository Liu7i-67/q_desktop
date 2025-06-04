// 用于单个字符串需要换行展示时
// 组件行为：超过X行后，hover展示全部内容

import { cn } from "@/utils/tools";
import { useEffect, useRef, useState } from "react";
import { Content } from "./Content";
import { ShowMore } from "./ShowMore";

export interface ITXTextCellProps {
  /** @param 类名 */
  className?: string;
  /** @param 字符串 */
  text?: string | number;
  /** @param 展示几行 默认为1行 */
  row?: number;
}

export const TXTextCell = function TXTextCell_(props: ITXTextCellProps) {
  const { className = "", row = 1, text = "" } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [renderMore, setRenderMore] = useState(false);
  useEffect(() => {
    if (!boxRef.current || !contentRef.current || !text) {
      return;
    }

    const checkOverflow = () => {
      if (boxRef.current && contentRef.current) {
        const boxWidth = boxRef.current.getBoundingClientRect().width;
        const contentWidth = contentRef.current.getBoundingClientRect().width;
        setRenderMore(contentWidth > boxWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  if (typeof text !== "number" && (!text || !text.length)) {
    return <div className={className}>-</div>;
  }

  return (
    <div
      className={cn(`wes-${row} relative`, "max-w-full", className)}
      ref={boxRef}
    >
      <div
        className="absolute opacity-0 w-max  -top-[100vh] pointer-events-none"
        ref={contentRef}
      >
        <Content text={text} />
      </div>
      <ShowMore text={text} showMore={renderMore} row={row} />
    </div>
  );
};
