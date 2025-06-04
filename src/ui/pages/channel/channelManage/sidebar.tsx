import React, { useEffect, useState } from "react";
import { Button, Input, Tree } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "./store";
import { titleRender, transformToTree } from "@/utils/treeTransform";
import { ChannelAuth } from "@/pages/channel/channelManage/auth";

const Sidebar: React.FC = () => {
  const { channelTypeTree } = useSelector((x) => x.state);
  const {
    getDataByTypeKey,
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
    nodes: any[]
  ): [any[], React.Key[]] => {
    const expandedKeys: Set<React.Key> = new Set();

    // 递归处理节点
    const processNode = (node: any, parentMatched = false): any | null => {
      const currentMatches = node.typeName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

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
          childList: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }

      return null;
    };

    const filteredNodes = nodes
      .map((node) => processNode(node))
      .filter(Boolean);

    return [filteredNodes, Array.from(expandedKeys)];
  };

  // 搜索
  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const [filteredData, keys] = getFilteredNodesAndExpandedKeys(
        value,
        channelTypeTree as any[]
      );
      setExpandedKeys(keys);
      setTreeData(transformToTree(filteredData));
    } else {
      setExpandedKeys([]);
      setTreeData(transformToTree(channelTypeTree));
    }
  };

  // 使用 useState 管理树形数据
  useEffect(() => {
    setTreeData(transformToTree(channelTypeTree));
  }, [channelTypeTree]);

  return (
    <div className="w-[310px] h-[calc(100vh-200px)] border-r border-[#f0f0f0] bg-white flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 p-4 shrink-0">
        {ChannelAuth.channelTypeCreate && (
          <Button type="primary" onClick={openEditClassifyModalCreate}>
            新增分类
          </Button>
        )}
        <Input
          placeholder="请输入渠道分类"
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
              createPermission: ChannelAuth.channelTypeCreate,
              editPermission: ChannelAuth.channelTypeUpdate,
              // 新增子节点
              onAdd: openEditClassifyModalCreateSon,
              // 修改本节点
              onEdit: openEditClassifyModalUpdate,
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
