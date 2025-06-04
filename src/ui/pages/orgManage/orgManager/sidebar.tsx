import { OrganizationAuth } from "@/pages/orgManage/orgManager/auth";
import { convertToTreeData, titleRender } from "@/utils/treeTransform";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Tree } from "antd";
import React, { useState } from "react";
import { useSelector } from "./store";

const Sidebar: React.FC = () => {
  const { orgTypeTree } = useSelector((x) => x.state);
  const {
    getDataByTypeKey,
    openEditClassifyModalCreate,
    openEditClassifyModalUpdate,
    openEditClassifyModalCreateSon,
    runDeleteOrgType,
  } = useSelector((x) => x.logic);
  const [searchValue, setSearchValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  // 搜索
  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const [_, keys] = getFilteredAndExpandedKeys(
        value,
        convertToTreeData(orgTypeTree)
      );
      setExpandedKeys(keys);
    } else {
      setExpandedKeys([]);
    }
  };

  const getFilteredAndExpandedKeys = (
    searchValue: string,
    nodes: any[]
  ): [any[], React.Key[]] => {
    const expandedKeys: Set<React.Key> = new Set();

    const processNode = (node: any, parentMatched = false): any | null => {
      const currentMatches = node.title
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      // 处理子节点
      let filteredChildren: any[] = [];
      if (node.children?.length) {
        filteredChildren = node.children
          .map((child: any) => processNode(child, currentMatches))
          .filter(Boolean);
      }

      // 判断是否保留该节点
      const shouldKeep =
        currentMatches || filteredChildren.length > 0 || parentMatched;

      if (shouldKeep) {
        expandedKeys.add(node.key);
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }

      return null;
    };

    const filteredNodes = nodes
      .map((node) => processNode(node))
      .filter(Boolean);

    return [filteredNodes, Array.from(expandedKeys)];
  };

  // 树形结构数据
  const treeData = searchValue
    ? getFilteredAndExpandedKeys(searchValue, convertToTreeData(orgTypeTree))[0]
    : convertToTreeData(orgTypeTree);

  return (
    <div className="mr-4 w-[310px] h-[calc(100vh-200px)] border-r border-[#f0f0f0] bg-white flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 p-4 shrink-0">
        {OrganizationAuth.organizationTypeCreate && (
          <Button type="primary" onClick={openEditClassifyModalCreate}>
            新增分类
          </Button>
        )}
        <Input
          placeholder="请输入机构分类名称"
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
              editPermission: OrganizationAuth.organizationTypeUpdate,
              createPermission: OrganizationAuth.organizationTypeCreate,
              deletePermission: OrganizationAuth.organizationTypeDelete,
              // 新增子节点
              onAdd: openEditClassifyModalCreateSon,
              // 修改本节点
              onEdit: openEditClassifyModalUpdate,
              // 删除
              onDelete: runDeleteOrgType,
            })
          }
          expandedKeys={expandedKeys}
          onExpand={setExpandedKeys}
          onSelect={(selectedKeys: any) => {
            getDataByTypeKey(selectedKeys[0]);
          }}
          defaultExpandParent={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
