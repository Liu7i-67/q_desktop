import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Empty, Spin, Tree } from "antd";

export const PickerList = observer(function PickerList_() {
  const root = useStore();
  const { logic, computed } = root;
  return (
    <div className="flex-1 pb-[16px] pl-[16px] overflow-y-auto">
      <Spin spinning={computed.loading}>
        {!logic.dataSource.length && <Empty description="没有找到相关数据" />}
        <Tree.DirectoryTree
          onSelect={(_, e) => {
            logic.onSelect(e.node);
          }}
          selectedKeys={logic.selectedKeys}
          icon={false}
          treeData={logic.dataSource}
        />
        {logic.dataSource.length === 200 && (
          <div className="py-2 text-gray-400 text-center">
            仅显示前200条相关数据
          </div>
        )}
      </Spin>
    </div>
  );
});
