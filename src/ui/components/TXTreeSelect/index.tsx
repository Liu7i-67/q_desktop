import { TreeSelect } from "antd";
import { FC } from "react";
import { ITXTreeSelectProps } from "./interface";

const TXTreeSelect: FC<ITXTreeSelectProps> = (props) => {
  return (
    <TreeSelect
      showSearch
      treeCheckable
      treeNodeFilterProp="label"
      treeExpandAction="click"
      maxTagCount={1}
      maxTagTextLength={6}
      allowClear
      {...props}
    />
  );
};

export default TXTreeSelect;

export * from "./interface";

export * from "./hook";
