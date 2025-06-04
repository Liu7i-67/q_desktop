import { classNames } from "@/utils/tools";
import {
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ReactNode, useState } from "react";

export interface ITXOverviewFoldProps {
  title?: ReactNode;
  tips?: string;
  children?: ReactNode;
  /** @param 默认是否折叠 */
  defaultFold?: boolean;
  className?: string;
  /** @function 折叠后的回调 true-已折叠 */
  onFold?: (fold: boolean) => void;
}

export const TXOverviewFold = function TXOverviewFold_(
  props: ITXOverviewFoldProps
) {
  const {
    tips = "",
    title = "",
    className = "",
    children,
    defaultFold = false,
    onFold,
  } = props;
  const [fold, setFold] = useState(defaultFold);
  return (
    <>
      <div
        className={classNames({
          "flex items-center justify-between": true,
          [className]: true,
        })}
      >
        <div className="flex-1 pr-4 text-[18px]">{title}</div>
        <div
          className="text-right text-xs cursor-pointer select-none"
          onClick={() =>
            setFold((o) => {
              onFold?.(!o);
              return !o;
            })
          }
        >
          <div>
            {fold ? "显示" : "隐藏"}图
            {!fold && (
              <EyeOutlined className="text-[#377bfd] ml-1 text-[14px]" />
            )}
            {fold && (
              <EyeInvisibleOutlined className="text-[#377bfd] ml-1 text-[14px]" />
            )}
          </div>
          <div className="flex items-center">
            <ExclamationCircleOutlined className="mr-2" />
            {tips}
          </div>
        </div>
      </div>
      {!fold && children}
    </>
  );
};
