// 用于多个字符串不想换行展示时
// 组件行为：超过一行后提供一个更多按钮，hover展示全部内容

import { cn } from "@/utils/tools";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Content } from "./Content";
import { ShowMore } from "./ShowMore";

export interface ITXListRowProps {
  /** @param 类名 */
  className?: string;
  /** @param 字符串集合 */
  list?: ReactNode | ReactNode[];
  /** @param 分隔符默认为, */
  separator?: ReactNode;
}

export const TXListRow = function TXListRow_(props: ITXListRowProps) {
  const { className = "", list = [], separator = "," } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [renderMore, setRenderMore] = useState(false);

  let haveValue = true;

  if (Array.isArray(list) && list.length === 0) {
    haveValue = false;
  }

  if (!Array.isArray(list) && [false, null, undefined].includes(list as null)) {
    haveValue = false;
  }

  if (typeof list === "string" && !list) {
    haveValue = false;
  }

  useEffect(() => {
    if (!boxRef.current || !contentRef.current || !haveValue) {
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
  }, [list, haveValue]);

  if (!haveValue) {
    return <div className={className}>-</div>;
  }

  let realList: ReactNode[] = [];

  if (Array.isArray(list)) {
    realList = list;
  } else {
    realList = [list];
  }

  return (
    <div className={cn("flex wes max-w-full", className)} ref={boxRef}>
      <div className="flex-1 wes">
        <div className="flex gap-1 w-max" ref={contentRef}>
          <Content list={realList} separator={separator} />
        </div>
      </div>
      {renderMore && <ShowMore list={realList} separator={separator} />}
    </div>
  );
};
