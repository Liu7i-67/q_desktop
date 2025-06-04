import { handleCopy } from "@/utils/tools";
import { FC } from "react";

export interface TXCopyableTableCellProps {
  copyText: string | string[];
  className?: string;
}

export const TXCopyableTableCell: FC<TXCopyableTableCellProps> = ({
  copyText,
  className = "",
}) => {
  const renderCopyText = (text: string | undefined) => {
    return text ? (
      <p
        className={"hover:underline hover:cursor-pointer"}
        onClick={() => {
          if (text) {
            handleCopy(text);
          }
        }}
        title={text}
      >
        {text}
      </p>
    ) : (
      "-"
    );
  };

  return (
    <div className={className}>
      {Array.isArray(copyText)
        ? copyText.length
          ? copyText.map((text, index) => {
              return (
                <div key={`${text}_${index}`} title={text}>
                  {renderCopyText(text)}
                </div>
              );
            })
          : "-"
        : renderCopyText(copyText)}
    </div>
  );
};
