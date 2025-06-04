import React, { useEffect, useState } from "react";
import { Button, Input, Tree } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "./store";
import { processDepartmentTreeData, titleRender } from "@/utils/treeTransform";
import { DeptAuth } from "@/pages/basic/department/auth";

const Sidebar: React.FC = () => {
  const { projectTypeTree } = useSelector((x) => x.state);
  const {
    setCurrentDept,
    getDataByTypeKey,
    getDepartmentTypeTree,
    openEditClassifyModalCreate,
    openEditClassifyModalUpdate,
    openEditClassifyModalCreateSon,
  } = useSelector((x) => x.logic);
  const [searchValue, setSearchValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<any[]>([]);

  // 过滤节点并获取展开的key
  const getFilteredNodesAndExpandedKeys = (
    searchValue: string,
    nodes: readonly any[]
  ): [any[], React.Key[]] => {
    const expandedKeys: Set<React.Key> = new Set();

    // 递归处理节点
    const processNode = (node: any, parentMatched = false): any | null => {
      const currentMatches =
        node.deptName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        node.deptFullName?.toLowerCase().includes(searchValue.toLowerCase());

      // 处理子节点
      let filteredChildren: any[] = [];
      if (node.childList?.length) {
        filteredChildren = node.childList
          .map((child: any) => processNode(child, currentMatches))
          .filter(Boolean);
      }

      // 判断是否保留该节点
      const shouldKeep =
        currentMatches || filteredChildren.length > 0 || parentMatched;

      if (shouldKeep) {
        expandedKeys.add(node.id);
        return {
          ...node,
          childList:
            filteredChildren.length > 0 ? filteredChildren : node.childList,
        };
      }

      return null;
    };

    const filteredNodes = nodes
      .map((node) => processNode(node))
      .filter(Boolean);

    return [filteredNodes, Array.from(expandedKeys)];
  };

  // 在搜索方法中使用
  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const [filteredData, keys] = getFilteredNodesAndExpandedKeys(
        value,
        projectTypeTree as any[]
      );
      setExpandedKeys(keys);
      setTreeData(processDepartmentTreeData(filteredData));
    } else {
      setExpandedKeys([]);
      setTreeData(processDepartmentTreeData(projectTypeTree as any[]));
    }
  };

  // 使用 useState 管理树形数据
  useEffect(() => {
    setTreeData(processDepartmentTreeData(projectTypeTree as any[]));
  }, [projectTypeTree]);

  useEffect(() => {
    getDepartmentTypeTree();
  }, []);

  return (
    <div className="w-[310px] h-[calc(100vh-200px)] border-r border-[#f0f0f0] bg-white flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 p-4 shrink-0">
        {DeptAuth.deptCreate && (
          <Button type="primary" onClick={openEditClassifyModalCreate}>
            新增部门
          </Button>
        )}
        <Input
          placeholder="请输入部门分类名称"
          className="w-[200px]"
          allowClear
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          addonAfter={<SearchOutlined />}
        />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <Tree
          className="p-4"
          treeData={treeData}
          titleRender={(node) =>
            titleRender({
              node,
              editPermission: DeptAuth.deptUpdate,
              createPermission: DeptAuth.deptCreate,
              // 新增子节点
              onAdd: openEditClassifyModalCreateSon,
              // 修改本节点
              onEdit: openEditClassifyModalUpdate,
            })
          }
          expandedKeys={expandedKeys}
          onExpand={setExpandedKeys}
          onSelect={(selectedKeys: any) => {
            if (selectedKeys[0]) {
              getDataByTypeKey(selectedKeys[0]);
            } else {
              setCurrentDept({});
            }
          }}
          defaultExpandParent={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
