import { SearchOutlined } from "@ant-design/icons";
import { observer } from "@quarkunlimit/qu-mobx";
import { Input, Tree } from "antd";
import { getConfigMap } from "../config";
import { useStore } from "../store/RootStore";
import TitleRender from "./TitleRender";

const SearchTree = observer(function _SearchTree() {
  const root = useStore();
  const { logic, propsStore } = root;

  const config = getConfigMap(propsStore.props.type);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 sticky">
        <Input
          prefix={<SearchOutlined />}
          size="large"
          placeholder={config?.placeholder ?? "请输入"}
          onChange={(e) => {
            logic.onSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex-1 overflow-auto max-h-[420px]">
        <Tree
          className="bg-[#F7F8FC]"
          checkStrictly
          checkable
          titleRender={(node) => <TitleRender node={node} />}
          treeData={logic.treeData}
          checkedKeys={logic.checkedKeys}
          expandedKeys={logic.expandKeys}
          onCheck={logic.onCheck}
          onExpand={logic.onExpand}
        />
      </div>
    </div>
  );
});

export default SearchTree;
