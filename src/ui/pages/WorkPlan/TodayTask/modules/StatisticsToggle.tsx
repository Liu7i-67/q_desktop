import React from "react";
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { cn } from "@/utils/tools";

interface StatisticsToggleProps {
  visible: boolean;
  onToggle: () => void;
  className?: string;
}

const StatisticsToggle: React.FC<StatisticsToggleProps> = ({
  visible,
  onToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        "text-right max-w-[300px] text-[#999999]",
        className ? className : ""
      )}
    >
      <div className="cursor-pointer" onClick={onToggle}>
        隐藏图 {visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />}
      </div>
      <div className="mt-1">
        <InfoCircleOutlined /> 以下图内数据均按客户维度去重后展示
      </div>
    </div>
  );
};

export default StatisticsToggle;
