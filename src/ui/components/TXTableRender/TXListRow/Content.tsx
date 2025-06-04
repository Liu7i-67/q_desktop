import { handleCopy } from "@/utils/tools";
import { ReactNode } from "react";
export interface TXTableRenderContent {
  list: ReactNode[];
  /** @param 分隔符默认为、 */
  separator?: ReactNode;
}

export const Content = function Content_(props: TXTableRenderContent) {
  const { list = [], separator } = props;

  const renderList: ReactNode[] = [];
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    renderList.push(
      <span
        className="cursor-pointer hover:underline"
        onClick={() => {
          if (typeof t === "string") {
            handleCopy(t);
          }
        }}
        key={i}
      >
        {t}
      </span>
    );

    if (!separator) {
      continue;
    }

    if (i !== list.length - 1) {
      renderList.push(<span key={`${i}_separator`}>{separator}</span>);
    }
  }

  return renderList;
};
