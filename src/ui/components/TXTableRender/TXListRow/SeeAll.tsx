import { Popover, Tooltip } from "antd";
import { Content } from "./Content";
import { ReactNode } from "react";
import { cn } from "@/utils/tools";
export interface IShowMoreProps {
  /** @param 字符串集合 */
  list?: ReactNode[];
  /** @param 面板class */
  contentClass?: string;
}

export const SeeAll = function SeeAll_(props: IShowMoreProps) {
  const { list = [], contentClass = "" } = props;

  return (
    <Popover
      content={
        <div
          className={cn(
            "max-w-[800px] flex flex-col gap-1 max-h-[400px] overflow-y-auto",
            contentClass
          )}
        >
          <Content list={list} />
        </div>
      }
    >
      <i className=" absolute top-1 right-1 iconfont icon-neirong cursor-pointer text-blue-400 hover:text-[orangered] ml-2" />
    </Popover>
  );
};
