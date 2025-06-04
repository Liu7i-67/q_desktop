import { cn } from "@/utils/tools";
import React from "react";

interface IProps {
  label: string;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const InfoItem = (props: IProps) => {
  const { label, content, contentClassName, className } = props;
  return (
    <div className={cn("flex items-center mr-8 my-2", className ?? "")}>
      <div>{label}</div>
      <div>：</div>
      <div className={cn(contentClassName ?? "")}>{content}</div>
    </div>
  );
};

export default InfoItem;
