import { handleCopy } from "@/utils/tools";
import { ReactNode } from "react";
export interface TXTableRenderContent {
  /** @param 字符串 */
  text?: string | number;
}

export const Content = function Content_(props: TXTableRenderContent) {
  const { text = "" } = props;
  return (
    <span
      className="cursor-pointer hover:underline"
      onClick={() => {
        handleCopy(text);
      }}
    >
      {text}
    </span>
  );
};
