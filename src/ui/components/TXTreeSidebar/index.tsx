import { SearchOutlined } from "@ant-design/icons";
import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import { Button, Input, Spin, Tree } from "antd";
import { forwardRef, Key, useImperativeHandle } from "react";
import { createButtonTextObj, placeholderTextObj } from "./constant";
import { Provider, useStore } from "./store/RootStore";
import {
  IITXTreeSidebarRef,
  ITXTreeSidebarProps,
} from "./store/RootStore/interface";
import { TreeTitle } from "./TreeTitle";

const TXTreeSidebar = observer(
  forwardRef<IITXTreeSidebarRef, ITXTreeSidebarProps>(
    function TXTreeSidebar_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, propsStore, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          getTreeData: logic.getTreeData,
          exportTreeData: () => logic.treeData,
        };
      });

      useWhen(
        () => true,
        () => logic.getTreeData()
      );

      return (
        <Spin spinning={computed.loading}>
          <div className="w-[310px] h-[calc(100vh-200px)] border-r border-[#f0f0f0] bg-white flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 p-4 shrink-0">
              {props.createPermission && (
                <Button
                  type="primary"
                  onClick={() => {
                    props.onCreate({
                      tree: logic.treeData,
                      isCreate: true,
                    });
                  }}
                >
                  {createButtonTextObj[propsStore.props.type]}
                </Button>
              )}
              <Input
                placeholder={placeholderTextObj[propsStore.props.type]}
                className="w-[200px]"
                allowClear
                onChange={(e) => logic.handleSearch(e.target.value)}
                addonAfter={<SearchOutlined />}
              />
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <Tree
                className="p-4"
                blockNode
                treeData={logic.treeData}
                titleRender={(node) => <TreeTitle node={node} />}
                expandedKeys={logic.expandKeys}
                onExpand={logic.setExpandedKeys}
                onSelect={(selectedKeys: Key[]) => {
                  props.onSelect(selectedKeys);
                }}
                defaultExpandParent={false}
              />
            </div>
          </div>
        </Spin>
      );
    }
  )
);

export default observer(
  forwardRef<IITXTreeSidebarRef, ITXTreeSidebarProps>(
    function TXTreeSidebarPage(props, ref) {
      return (
        <Provider>
          <TXTreeSidebar {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
