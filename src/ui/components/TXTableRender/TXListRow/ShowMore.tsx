import { Tooltip } from "antd";
import { Content } from "./Content";
import { ReactNode } from "react";
export interface IShowMoreProps {
  /** @param 字符串集合 */
  list?: ReactNode[];
  /** @param 分隔符默认为、 */
  separator?: ReactNode;
}

export const ShowMore = function ShowMore_(props: IShowMoreProps) {
  const { list = [], separator } = props;

  return (
    <Tooltip
      title={
        <div className="max-w-[400px] max-h-[400px] flex flex-wrap gap-1 overflow-y-auto">
          <Content list={list} separator={separator} />
        </div>
      }
    >
      <i className="iconfont icon-daikaishi cursor-pointer text-blue-400 hover:text-[orangered] ml-2" />
    </Tooltip>
  );
};
