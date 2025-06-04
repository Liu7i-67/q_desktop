import { Col, Row } from "antd";
import "./index.css";
import { ITXDescriptionItem, ITXDescriptionsProps } from "./interface";
import { cn } from "@/utils/tools";

export const TXDescriptions = function TXDescriptions_(
  props: ITXDescriptionsProps
) {
  const {
    items,
    className = "",
    labelClassName = "",
    size = "big",
    border = true,
    gutter,
  } = props;

  const list: ITXDescriptionItem[][] = [];

  let total = 0;
  let rowList: ITXDescriptionItem[] = [];
  for (let cell of items) {
    let labelSpan = cell.labelSpan || 3;
    let childrenSpan = cell.childrenSpan || 5;
    if (total === 0) {
      rowList.push(cell);
      total += labelSpan;
      total += childrenSpan;
      continue;
    }

    let nextTotal = total + labelSpan + childrenSpan;
    if (nextTotal > 24) {
      list.push(rowList);
      rowList = [];
      rowList.push(cell);
      total = labelSpan + childrenSpan;
      continue;
    }
    rowList.push(cell);
    total += labelSpan;
    total += childrenSpan;
  }

  if (rowList.length > 0) {
    list.push(rowList);
  }

  return (
    <div
      className={cn("tx-descriptions", className, size, border ? "border" : "")}
    >
      {list.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} className="tx-descriptions-row" gutter={gutter}>
            {row.map((c, cIndex) => {
              return [
                <Col
                  span={c.labelSpan || 3}
                  key={`${cIndex}_label`}
                  className={cn("tx-descriptions-label", labelClassName)}
                >
                  {c.label}
                </Col>,
                <Col
                  span={c.childrenSpan || 5}
                  key={`${cIndex}_children`}
                  className={"tx-descriptions-children"}
                >
                  {c.children}
                </Col>,
              ];
            })}
          </Row>
        );
      })}
    </div>
  );
};

export * from "./interface";
