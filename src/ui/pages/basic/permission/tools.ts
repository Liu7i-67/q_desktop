import { IPermissionTreeNode } from "./types";

/**
 * 查找权限树中的权限ids
 * @param tree
 * @param permissionKeys
 * @returns
 */
export const findNodeIdsByPermissionKeys = (
  tree: readonly any[],
  permissionKeys: any[]
) => {
  let resultIds: any[] = [];

  function traverse(node: any) {
    if (permissionKeys.includes(node.permissionKey)) {
      resultIds.push(node.id);
    }

    if (node.childList && node.childList.length > 0) {
      for (let child of node.childList) {
        traverse(child);
      }
    }
  }

  // 遍历树的每个节点
  for (let node of tree) {
    traverse(node);
  }

  return resultIds;
};

/**
 * 给菜单树的所有节点添加 checked 字段
 * @param tree
 * @param permissionKeys
 * @param dataScopeList
 * @param resultIds
 * @returns
 */
export const markNodesByPermissionKeys = (tree: any[], permissions: any[]) => {
  function traverse(node: any) {
    const newNode = { ...node };
    const findNode = permissions.find(
      (item: any) => item.permissionKey === newNode.permissionKey
    );
    if (findNode) {
      newNode.checked = true;
      newNode.dataScope = findNode.dataScope;
    } else {
      newNode.checked = false;
    }

    // 处理子节点
    if (newNode.childList && Array.isArray(newNode.childList)) {
      // 递归遍历子节点，并创建一个新的子节点数组
      newNode.childList = newNode.childList.map((child: any) =>
        traverse(child)
      );
    }

    // 返回当前节点的副本
    return newNode;
  }

  // 遍历并复制每个根节点
  return tree.map((node, index) => traverse(node));
};

/**
 * findAndModifyChildListNode 的辅助函数，递归处理子节点 checked status
 * @param tree
 */
export function dfsUnsetChecked(
  tree: any[],
  checked: boolean // permissionKeysIds: readonly any[]
) {
  function traverse(node: any) {
    // if (!permissionKeysIds.includes(node.id)) return node
    const newNode = {
      ...node,
    };
    newNode.checked = checked;

    // 如果存在子节点，则递归遍历子节点
    if (newNode.childList && Array.isArray(newNode.childList)) {
      newNode.childList = newNode.childList.map(traverse);
    }

    return newNode;
  }

  // 遍历每个根节点
  return tree.map(traverse);
}

/**
 * 遍历树，把指定id节点的 checked
 * @param tree
 * @param targetId
 * @returns
 */
export function findAndModifyChildListNode(
  tree: any[],
  targetId: any,
  checked: boolean // permissionKeysIds: readonly any[]
) {
  function traverse(node: any) {
    const newNode = { ...node };

    if (newNode.id === targetId) {
      newNode.checked = checked;
      // 如果当前节点关闭，且有子节点，则子节点全关了，如果当前节点选中，则不管子节点
      if (
        // !checked &&
        newNode.childList &&
        Array.isArray(newNode.childList)
      ) {
        newNode.childList = dfsUnsetChecked(
          newNode.childList,
          checked // permissionKeysIds
        );
      }
    } else {
      if (newNode.childList && Array.isArray(newNode.childList)) {
        newNode.childList = newNode.childList.map((child: any) =>
          traverse(child)
        );
      }
    }

    return newNode;
  }

  return tree.map((node) => traverse(node));
}

/**
 * 处理指定节点的父节点的 checked status
 * @param tree
 * @param targetId
 */
export const findAndModifyParentListNode = (
  tree: any[],
  targetId: any,
  checked: boolean
) => {
  const newTree = [...tree];

  function traverseAndModifyAncestors(node: any, ancestors: any[] = []) {
    if (node.id !== targetId) {
      ancestors.push(node);
      if (node.childList && node.childList.length > 0) {
        node.childList.forEach((child: any) => {
          traverseAndModifyAncestors(child, [...ancestors]);
        });
      }
    } else {
      // 没有子节点时，回溯并修改祖先节点的状态
      ancestors.forEach((ancestor) => {
        // 如果是选中，则直接选
        if (checked) {
          ancestor.checked = true;
        } else {
          /**
           * 如果是取消选中，需要判断当前节点是不是最外层的节点，如果是，判断它的下一级子阶段是不是都取消勾选了
           * 如果都取消勾选了，则把当前这个最外层节点关掉，否则不处理
           */
          if (!ancestor.parentCode) {
            const isAllCancel = ancestor.childList.every(
              (node: any) => !node.checked
            );
            ancestor.checked = isAllCancel ? false : true;
          }
        }
      });
    }
  }

  newTree.map((root) => {
    traverseAndModifyAncestors(root);
  });
  // if (checked) {
  //   newTree.map((root) => {
  //     traverseAndModifyAncestors(root);
  //   });
  // }

  return newTree;
};

/**
 * 处理菜单树中，childList 为空数组的节点
 * @param tree
 * @returns
 */
export function cleanEmptyChildLists(tree: any[]) {
  // 遍历每一个节点
  return tree.map((node) => {
    // 克隆当前节点（防止直接修改原数组）
    const newNode = { ...node };

    // 如果 childList 存在且为空数组，则删除它
    if (newNode.childList && newNode.childList.length === 0) {
      delete newNode.childList;
    } else if (newNode.childList) {
      // 如果 childList 存在且不为空数组，则递归处理子节点
      newNode.childList = cleanEmptyChildLists(newNode.childList);
    }

    return newNode;
  });
}

/**
 * 修改指定节点的属性
 * @param tree
 * @param nodeId
 * @param newDataScope
 * @returns
 */
export function updateTreeNodeKey(
  tree: IPermissionTreeNode[],
  nodeId: string,
  key: string,
  data: any
) {
  // 创建一个新数组来存储修改后的节点
  const newTree = tree.map((node) => {
    // 克隆当前节点
    const newNode = { ...node };

    // 检查当前节点是否是我们要修改的节点
    if (newNode.id === nodeId) {
      // 如果是，则修改 dataScope 属性
      newNode[key] = data;
    } else if (newNode.childList) {
      // 如果不是，但节点有子节点，则递归处理子节点
      newNode.childList = updateTreeNodeKey(
        newNode.childList,
        nodeId,
        key,
        data
      );
    }

    // 返回修改后的节点
    return newNode;
  });

  // 返回新的数组树
  return newTree;
}

/**
 * 在树形数组中查找指定节点
 * @param tree 树形数组
 * @param predicate 判断函数，返回 true 时匹配节点
 * @param filterKey 子节点字段名（默认为 'childList'）
 * @returns 找到的节点或 null
 */
const findTreeNode = (
  tree: IPermissionTreeNode[],
  predicate: (node: IPermissionTreeNode) => boolean,
  filterKey: string = "childList"
): IPermissionTreeNode | null => {
  for (const node of tree) {
    // 检查当前节点
    if (predicate(node)) return node;

    // 递归检查子节点
    if (node[filterKey]?.length) {
      const found = findTreeNode(node[filterKey], predicate, filterKey);
      if (found) return found;
    }
  }
  return null;
};

/**
 * 获取选中的权限节点 id 及 dataScope，拼接为结果数组返回
 * @param tree 当前搜索的权限树
 * @param originTree 没搜索前的权限树
 * @returns
 */
export function getCheckedIds(tree: any[], originTree: any[]) {
  let checkedIds: any[] = [];

  function traverse(nodes: any[]) {
    for (let node of nodes) {
      if (node.checked === true) {
        checkedIds.push({
          menuId: node.id,
          dataScopeEnum: node.dataScope,
        });
        if (node.childList && node.childList.length > 0) {
          traverse(node.childList);
        }
      }
    }
  }

  traverse(originTree);
  return checkedIds;
}

/**
 * 模糊查询权限树
 * @param tree
 * @param key
 * @param val
 * @returns
 */
export const filterPermissionTree = (tree: any[], key: any, val: any) => {
  const result: any = [];
  tree.forEach((item) => {
    if (item.childList && item.childList.length) {
      let childList = filterPermissionTree(item.childList, key, val);
      let obj = {
        ...item,
        childList,
      };
      if (childList && childList.length) {
        result.push(obj);
      } else if (item[key].includes(val)) {
        result.push({ ...item });
      }
    } else {
      if (item[key].includes(val)) {
        result.push(item);
      }
    }
  });
  return result;
};

/**
 * collectCheckedIds 的辅助函数，校验当前节点是否是手动折叠
 */
export function checkCurrentNodeUnexpandByHand(
  node: any,
  prevExpandPermissionKeys: readonly any[]
) {
  function childExpand(childList: any[]) {
    const secondLevel = childList.map((child) => child.id);
    return prevExpandPermissionKeys.some((key) => secondLevel.includes(key));
  }

  return (
    !prevExpandPermissionKeys.includes(node.id) && childExpand(node.childList)
  );
}

/**
 * 根据权限树的 chekced status 是否为 true，获取选中的 节点 ids
 * @param tree
 * @prevExpandPermissionKeys 上一次表格的展开项keys
 * @returns
 */
export function collectCheckedIds(
  tree: any[],
  prevExpandPermissionKeys: readonly any[]
) {
  const result: any[] = [];

  function traverse(node: any) {
    // 如果没有展开过任何一项，则选中父节点时，直接展开
    if (!prevExpandPermissionKeys.length) {
      if (node.checked) {
        result.push(node.id);
      }
    } else {
      // 如果是最外层，且最外层的id不存在 prevExpandPermissionKeys 但是子节点存在 prevExpandPermissionKeys 时，说明手动关闭，不做处理
      if (
        !node.parentCode &&
        checkCurrentNodeUnexpandByHand(node, prevExpandPermissionKeys)
      ) {
        // 不做任何处理
      } else {
        if (node.checked) {
          result.push(node.id);
        }
      }
    }
    // if (node.checked) {
    //   result.push(node.id)
    // }
    if (node.childList && node.childList.length > 0) {
      node.childList.forEach((child: any) => traverse(child));
    }
  }

  tree.forEach((node) => traverse(node));
  return result;
}
