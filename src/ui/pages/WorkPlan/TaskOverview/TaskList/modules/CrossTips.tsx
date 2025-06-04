import { cn } from "@/utils/tools";
import { Tooltip } from "antd";

export const CrossTips = function CrossTips_() {
  return (
    <Tooltip title="该客户存在跨门店【派单】或【成交】记录，请在老系统或联系技术人员查看历史数据。">
      <div
        className={cn(
          "text-white font-bold mr-1",
          "flex justify-center items-center",
          "w-[16px] h-[16px] mt-[3px] rounded-[50%] cursor-pointer",
          "bg-gradient-to-b from-yellow-500 to-yellow-400"
        )}
      >
        ?
      </div>
    </Tooltip>
  );
};
