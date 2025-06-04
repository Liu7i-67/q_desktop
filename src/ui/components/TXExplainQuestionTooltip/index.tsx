import { cn } from "@/utils/tools";
import { Space, Tooltip } from "antd";
import { FC, ReactNode } from "react";

export interface TXExplainQuestionTooltipProps {
  /**
   * @toolTipTitle tooltip 需要展示的内容
   */
  toolTipTitle: ReactNode | (() => ReactNode);
  /**
   * @title 展示的内容
   */
  title: ReactNode;
  /**
   * @className
   */
  className?: string;
}

const TXExplainQuestionTooltip: FC<TXExplainQuestionTooltipProps> = ({
  toolTipTitle,
  title,
  className = "",
}) => {
  return (
    <Space>
      {title}
      <Tooltip title={toolTipTitle}>
        <div
          className={cn(
            "ml-2",
            "text-white font-bold",
            "flex justify-center items-center",
            "w-[16px] h-[16px] rounded-[50%] cursor-pointer",
            "bg-gray-400 hover:bg-gray-500 ease-in-out duration-300",
            `${className}`
          )}
        >
          ?
        </div>
      </Tooltip>
    </Space>
  );
};

export default TXExplainQuestionTooltip;
