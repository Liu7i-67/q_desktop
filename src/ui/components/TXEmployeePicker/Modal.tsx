import type { ITXDept, ITXEmployeePickerModalProps } from "./interface";
import { Input, Tree, TreeProps } from "antd";
import "./modal.css";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useTXEmployeePicker } from "./useTXEmployeePicker";
import { Modal } from "../TXModal";
import { CloseOutlined } from "@ant-design/icons";
import { DataNode } from "antd/es/tree";

export const maxTagPlaceholder = (node: any[]) => {
  return `+${node.length}项`;
};

export interface ITXEmployeePickerModalRef {
  /** @function 展示弹窗 */
  openModal: () => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

const TXEmployeePickerModal = forwardRef<
  ITXEmployeePickerModalRef,
  ITXEmployeePickerModalProps
>(function TXEmployeePicker_(props, ref) {
  const { className, type, onOk, ...resetProps } = props;
  const data = useTXEmployeePicker({ type });
  const [visible, setVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [treeData, setTreeData] = useState<DataNode[] | null>(null);

  const onClose = useCallback(() => {
    setVisible(false);
    setCheckedKeys([]);
    setExpandedKeys([]);
    setSearchVal("");
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setVisible(true),
      closeModal: onClose,
    };
  });

  const realProps: TreeProps = Object.assign(
    {},
    {
      placeholder: "请选择",
      showSearch: true,
      allowClear: true,
      treeNodeFilterProp: "title",
      className: `tx-employee-modal-picker ${className || ""}`,
      maxTagCount: 1,
      maxTagPlaceholder,
      fieldNames: {
        key: "value",
      },
      showIcon: false,
    },
    data.props,
    resetProps
  );

  const loop = (
    item: ITXDept,
    searchVal: string,
    path: string[],
    ids: string[]
  ): DataNode => {
    if (typeof item.title === "string" && item.title.includes(searchVal)) {
      ids.push(...path);
    }

    const children = [];
    for (let c of item.children || []) {
      children.push(
        loop(c as unknown as ITXDept, searchVal, [...path, item.value], ids)
      );
    }
    const strTitle = item.title as string;
    const index = strTitle.indexOf(searchVal);
    const beforeStr = strTitle.substring(0, index);
    const afterStr = strTitle.slice(index + searchVal.length);
    const title =
      index > -1 ? (
        <span key={item.key}>
          {beforeStr}
          <span className="text-orange-400">{searchVal}</span>
          {afterStr}
        </span>
      ) : (
        <span key={item.key}>{strTitle}</span>
      );

    return {
      ...item,
      title,
      children: children.length ? children : undefined,
    } as unknown as DataNode;
  };

  const onChange = (val: string) => {
    const ids: string[] = [];
    setSearchVal(val);
    const treeData = (realProps.treeData || []) as unknown as ITXDept[];

    if (!val) {
      setTreeData(null);
      setExpandedKeys([]);
      return;
    }

    const newTreeData = treeData.map((item) => {
      return loop(item, val, [], ids);
    });
    setTreeData(newTreeData);
    setExpandedKeys([...new Set(ids)]);
  };

  return (
    <Modal
      width={800}
      title="选择人员"
      open={visible}
      onCancel={onClose}
      onOk={() => {
        onOk?.(checkedKeys);
      }}
      styles={{
        body: {
          display: "flex",
          height: "450px",
          overflow: "hidden",
        },
      }}
    >
      <div className="w-[350px] overflow-hidden flex flex-col">
        <div className="h-[40px]">
          <Input.Search
            placeholder="请输入"
            value={searchVal}
            allowClear
            onChange={(e) => {
              onChange(e.target.value || "");
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Tree.DirectoryTree
            {...realProps}
            expandedKeys={expandedKeys}
            // @ts-ignore
            onExpand={setExpandedKeys}
            onCheck={(e) => {
              const real = data.getRealValue(e as string[], true) as string[];
              setCheckedKeys(real);
            }}
            checkedKeys={data.getShowValue(checkedKeys) as string[]}
            autoExpandParent
            treeData={treeData || realProps.treeData}
          />
        </div>
      </div>
      <div className="flex-1 pl-2 ml-2 border-l-[1px] flex flex-col overflow-hidden">
        <div className="font-bold h-[40px]">已选({checkedKeys.length})</div>
        <div className="overflow-y-auto">
          {checkedKeys.map((r) => {
            const record = data.infoMap.current?.get(r);
            let text = r;
            if (record) {
              text = record.title;
            }
            return (
              <div key={r} className="flex items-center px-2 py-2 select-none">
                <div className="flex-1 wes pr-2">{text}</div>
                <CloseOutlined
                  className=" cursor-pointer"
                  onClick={() => {
                    setCheckedKeys((k) => k.filter((i) => i !== r));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
});

export default TXEmployeePickerModal;
