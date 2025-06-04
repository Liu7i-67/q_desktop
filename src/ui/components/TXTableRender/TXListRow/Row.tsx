// 用于多个字符串不想换行展示时
// 组件行为：超过一行后提供一个更多按钮，hover展示全部内容

import { cn } from "@/utils/tools";
import { ReactNode, useState } from "react";
import { SeeAll } from "./SeeAll";

export interface ITXListByRowProps {
  /** @param 类名 */
  className?: string;
  /** @param 字符串集合 */
  list?: ReactNode | ReactNode[];
  /** @param 展示多少个 默认为1 */
  row?: number;
  /** @param 面板class */
  contentClass?: string;
}

export const TXListByRow = function TXListRow_(props: ITXListByRowProps) {
  const { className = "", list = [], contentClass, row = 1 } = props;

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

  if (!haveValue) {
    return <div className={className}>-</div>;
  }

  let realList: ReactNode[] = [];

  if (Array.isArray(list)) {
    realList = list;
  } else {
    realList = (list as string).split("\n");
  }

  return (
    <div className={cn("max-w-full", className)}>
      {realList.map((r, rIndex) => {
        if (rIndex < row) {
          return (
            <div className="wes pr-3" key={rIndex}>
              {r}
            </div>
          );
        }
        return null;
      })}
      <SeeAll list={realList} contentClass={contentClass} />
    </div>
  );
};
