import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Popconfirm } from "antd";
import { ReactNode } from "react";
import { useStore } from "./store/RootStore";
import { TNode } from "./store/RootStore/interface";

export interface ITreeTitleProps {
  node: TNode;
}

export const TreeTitle = observer(function TreeTitle_({
  node,
}: ITreeTitleProps) {
  const root = useStore();
  const { logic, propsStore } = root;

  return (
    <div
      key={node.key}
      className="flex items-center justify-between w-full group"
    >
      <span>{node.title as ReactNode}</span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        {propsStore.props.createPermission && (
          <Button
            type="link"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              propsStore.props.onCreate({
                tree: logic.treeData,
                node,
                isCreate: true,
              });
            }}
          >
            <PlusOutlined />
          </Button>
        )}
        {propsStore.props.updatePermission && (
          <Button
            type="link"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              propsStore.props.onUpdate({
                tree: logic.treeData,
                node,
                isCreate: false,
              });
            }}
          >
            <EditOutlined />
          </Button>
        )}
        {propsStore.props.deletePermission && (
          <div
            className="inline-block"
            onClick={(e) => {
              // Popconfirm 点开时会触发冒泡,包一层div阻止冒泡
              e.stopPropagation();
            }}
          >
            <Popconfirm
              title="删除机构分类"
              description="你确定要删除该机构分类吗?"
              onConfirm={() => {
                logic.deleteTreeNode(node);
              }}
              okText="删除"
              okType="danger"
              cancelText="取消"
              cancelButtonProps={{
                type: "primary",
              }}
              onPopupClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button type="link" size="small">
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
});
