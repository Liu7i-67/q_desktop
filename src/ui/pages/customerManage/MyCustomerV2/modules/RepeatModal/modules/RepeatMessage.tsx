// RepeatMessage.tsx
import React from "react";
import { IRepeatResult } from "@/pages/customerManage/MyCustomerV2/interface";

interface RepeatMessageProps {
  repeatResult: IRepeatResult | null;
}

const RepeatMessage: React.FC<RepeatMessageProps> = ({ repeatResult }) => {
  let message: React.ReactNode = "没有重复数据哦~";

  if (typeof repeatResult === "string" && repeatResult) {
    message = (repeatResult as string).split("\n").map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  } else if (repeatResult?.repeatMessage) {
    message = repeatResult.repeatMessage.split("\n").map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  }

  return <div>{message}</div>;
};

export default RepeatMessage;
