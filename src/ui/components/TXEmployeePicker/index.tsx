import type { ITXDept, ITXEmployeePickerProps } from "./interface";
import { TreeSelect, TreeSelectProps } from "antd";
import "./index.css";
import { useCallback } from "react";
import React from "react";
import { useTXEmployeePicker } from "./useTXEmployeePicker";
import { classNames } from "@/utils/tools";

export const maxTagPlaceholder = (node: any[]) => {
  return `+${node.length}项`;
};

const TXEmployeePicker = React.memo(function TXEmployeePicker_(
  props: ITXEmployeePickerProps
) {
  const { className, type, onChange, value, itemClassName, ...resetProps } =
    props;
  const data = useTXEmployeePicker({ type });

  const filterTreeNode = useCallback(
    (inputValue: string, treeNode: ITXDept) => {
      if (treeNode.isDept) {
        return treeNode?.title.toLowerCase().includes(inputValue.toLowerCase());
      }

      return `${treeNode?.title} ${treeNode?.phoneNumber}`
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    },
    []
  );

  const treeTitleRender = useCallback(
    (node: ITXDept) => {
      if (!node) {
        return "-";
      }

      if (node?.isDept) {
        return node.title;
      }
      return (
        <div
          className={classNames({
            "border-b-[1px] py-1 employee-item wes": true,
            [itemClassName || data.props.itemClassName || ""]: true,
          })}
        >
          <div
            className={classNames({
              "wes flex items-center": true,
            })}
          >
            <i className="mr-1 sub-info iconfont icon-lianxiren1"></i>
            {node.enableFlag === false && (
              <i className="text-[red] mr-1 sub-info iconfont icon-jinyong"></i>
            )}
            <span className="wes flex-1">{node.title}</span>
          </div>
          <div className="sub-info wes">
            <i className="mr-1 iconfont icon-dianhua"></i>
            <span className="text-gray-400">{node.phoneNumber}</span>
          </div>
        </div>
      );
    },
    [itemClassName]
  );

  // @ts-ignore
  const realProps: TreeSelectProps = Object.assign(
    {},
    {
      placeholder: "请选择",
      showSearch: true,
      allowClear: true,
      treeNodeFilterProp: "title",
      className: `tx-employee-picker ${className || ""}`,

      filterTreeNode,
      treeTitleRender,
      maxTagCount: 1,
      maxTagPlaceholder,
    },
    data.props,
    resetProps
  );

  return (
    <TreeSelect
      {...realProps}
      value={data.getShowValue(value)}
      onChange={(v, l, e) => {
        const realValue = data.getRealValue(v);
        onChange?.(realValue, l, e);
      }}
    />
  );
});

export default TXEmployeePicker;

export * from "./interface";

export * from "./tool";

export * from "./useTXEmployeePicker";
