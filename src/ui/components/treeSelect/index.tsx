import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd";

const TxTreeCompont = ({
  allowClear = true,
  maxTagCount = 3,
  placeholder = "请选择数据",
  showSearch = true,
  dropdownStyle = { maxHeight: 400, overflow: "auto" },
  treeNodeFilterProp = "label",
  treeExpandAction = "click",
  ...props
}: TreeSelectProps) => {
  // 将搜索词与节点的 title（label）进行匹配
  const filterByLabel = (inputValue: string, treeNode: any) => {
    return treeNode?.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <TreeSelect
      allowClear={allowClear}
      maxTagCount={maxTagCount}
      placeholder={placeholder}
      showSearch={showSearch}
      dropdownStyle={dropdownStyle}
      filterTreeNode={filterByLabel}
      treeNodeFilterProp={treeNodeFilterProp}
      {...props}
    />
  );
};
export default TxTreeCompont;
