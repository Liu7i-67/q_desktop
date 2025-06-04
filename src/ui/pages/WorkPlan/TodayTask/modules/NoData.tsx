import React from "react";
import NoDataWithAnimation from "./NoDataWithAnimation/NoDataWithAnimation";

interface NoDataProps {
  title?: string;
  description?: string;
  linkText?: string;
  onLinkClick?: () => void;
}

const NoData: React.FC<NoDataProps> = ({
  title = "太棒了! 你完成了今天的全部任务!",
  description = "建议可提前处理明日优先任务～",
  linkText = "查看明日计划",
  onLinkClick,
}) => {
  return (
    <div className="h-[400px] flex flex-col justify-center items-center text-center">
      <div>
        <NoDataWithAnimation />
      </div>
      <div className="mt-[24px] font-bold text-[26px] text-black">{title}</div>
      <div className="mt-[10px] text-[rgba(0,0,0,0.45)]">{description}</div>
      <div
        className={`underline mt-[28px] text-[#0867E9] ${
          onLinkClick ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => {
          if (onLinkClick) onLinkClick();
        }}
      >
        {linkText}
      </div>
    </div>
  );
};

export default NoData;
