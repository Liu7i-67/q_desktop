import { TRecord } from "@/utils/interface";
import { getConfigMap } from "./config";
import { INodeConfig, TTXTreeCascaderType } from "./interface";
import { TTXTreeCascaderNode } from "./store/RootStore/interface";
import { TXTreeMapHelper } from "./TXTreeMapHelper";

/**
 * 将指定属性转为可选的新类型
 * @param T 原始接口类型
 * @param K 需要转为可选的属性名（联合类型）
 */
export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

/**@function 转换源树为指定树结构 */
export const transformOriginTree = (
  type: TTXTreeCascaderType,
  tree: TRecord[],
  onCustomExtraNodeKey?: (node: TRecord) => object
): TTXTreeCascaderNode[] => {
  const nodeConfig = getConfigMap(type)?.nodeConfig;
  const dealTree = mergeTreeMultipleChidlrens(
    tree,
    nodeConfig?.map((config) => config.childrenKey) ?? []
  );
  return transformMergeTreeMultipleTree(
    dealTree,
    nodeConfig,
    null,
    0,
    type,
    onCustomExtraNodeKey
  );
};

/**@function 初始节点合并多维度子树 */
export const mergeTreeMultipleChidlrens = (
  tree: TRecord[],
  fieldsToMerge: string[]
): TRecord[] => {
  return tree.map((node) => {
    const mergedNode = { ...node };
    const children: TRecord[] = [];

    fieldsToMerge.forEach((field) => {
      if (node[field] && Array.isArray(node[field])) {
        children.push(...node[field]);
        delete mergedNode[field];
      }
    });

    if (children.length > 0) {
      mergedNode.children = [...(mergedNode.children || []), ...children];
    }

    // 递归处理子节点
    if (mergedNode.children) {
      mergedNode.children = mergeTreeMultipleChidlrens(
        mergedNode.children,
        fieldsToMerge
      );
    }

    return mergedNode;
  });
};

/**@function 处理多维度数为指定结构树 */
export const transformMergeTreeMultipleTree = (
  nodes: TRecord[],
  configs: INodeConfig[] | undefined = [],
  parentId: string | null = null,
  level: number,
  type: TTXTreeCascaderType,
  onCustomExtraNodeKey?: (node: TRecord) => object
): TTXTreeCascaderNode[] => {
  const txTreeMapHelper = TXTreeMapHelper.getInstance();
  return nodes.map((node) => {
    // 当前node是匹配哪一项配置
    const matchedConfigIndex = configs.findIndex((config) =>
      node.hasOwnProperty(config.searchFilterKey)
    );
    const matchedConfig = configs[matchedConfigIndex];
    const currentKey = level
      ? `${parentId}_${node[matchedConfig.key]}`
      : node[matchedConfig.key];
    const extraKeyValue = onCustomExtraNodeKey?.(node);
    const newNode: TTXTreeCascaderNode = {
      title: node[matchedConfig.searchFilterKey],
      key: currentKey,
      data: {
        ...node,
      },
      highLight: false,
      parentId: node[matchedConfig.parentKey] || parentId,
      level,
      ...(extraKeyValue ?? {}),
    };
    txTreeMapHelper.setTXTreeMapHelperMap(
      type,
      node[matchedConfig.key],
      newNode
    );
    // 递归处理子节点
    if (node.children) {
      newNode.children = transformMergeTreeMultipleTree(
        node.children,
        configs,
        currentKey,
        level + 1,
        type,
        onCustomExtraNodeKey
      );
    }

    return newNode;
  });
};

/**@function 过滤转换后的树，返回新的树及指定树节点的路径 */
export const filterTreeWithExpand = (
  tree: TTXTreeCascaderNode[],
  searchText: string
): { filteredData: TTXTreeCascaderNode[]; expandKeys: string[] } => {
  const expandedKeys: Set<string> = new Set();

  const filterFn = (nodes: TTXTreeCascaderNode[]): TTXTreeCascaderNode[] => {
    return nodes
      .map((node) => {
        const isMatch = (node.title as string)
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const children = node.children
          ? filterFn(node.children as TTXTreeCascaderNode[])
          : undefined;
        const hasMatchedChild = children && children.length > 0;

        // 标记需展开的节点key（当前匹配或包含匹配子节点）
        if (isMatch || hasMatchedChild) {
          expandedKeys.add(node.key as string);
        }

        return {
          ...node,
          highLight: isMatch,
          children: hasMatchedChild || isMatch ? children : undefined,
        };
      })
      .filter(
        (node) =>
          node.children?.length ||
          (node.title as string)
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
  };

  return {
    filteredData: filterFn(tree),
    expandKeys: Array.from(expandedKeys),
  };
};

/**@function 获取指定树节点的路径 */
export const generateNodePath = (tree: TRecord[]): Map<string, TRecord> => {
  const keyMap = new Map<string, TRecord>();
  const buildMap = (nodes: TRecord[]) => {
    nodes.forEach((node) => {
      keyMap.set(node.key, node);
      if (node.children) buildMap(node.children);
    });
  };
  buildMap(tree);
  return keyMap;
};

/**@function 去重树节点 */
export const deduplicateByKey = (tree: TTXTreeCascaderNode[], key: string) => {
  const seen = new Map<any, boolean>();
  return tree.filter((node) => {
    const keyValue = node[key];
    if (!seen.has(keyValue)) {
      seen.set(keyValue, true);
      return true;
    }
    return false;
  });
};

/**@function 选择节点时，去重树节点 */
export const deduplicateByKeyWidthChecked = (
  checkedNodes: TTXTreeCascaderNode[],
  dedupKey: string
) => {
  return checkedNodes.filter((node) => {
    let key = node.key as string;
    const keyValue = key.split("_")[node.level ?? 0];
    if (keyValue !== dedupKey) {
      return true;
    }
    return false;
  });
};
