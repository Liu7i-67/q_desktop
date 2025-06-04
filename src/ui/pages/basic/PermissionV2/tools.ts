import { IDataSource } from "./interface";

/** @function 通过permissionKey找出节点id */
export function findNodeIdsByPermissionKeys(
  tree: IDataSource[],
  permissionKeys: string[]
): string[] {
  const resultIds: string[] = [];

  const stack: IDataSource[] = [...tree];
  while (stack.length) {
    const node = stack.pop()!;
    if (permissionKeys.includes(node.permissionKey)) {
      resultIds.push(node.id);
    }
    if (node.childList?.length) {
      stack.push(...node.childList);
    }
  }

  return resultIds;
}

/** @function 构建 id -> node 和 id -> parent 映射 */
export function buildNodeMaps(tree: IDataSource[]) {
  const idMap = new Map<string, IDataSource>();
  const parentMap = new Map<string, IDataSource>();

  const stack: { node: IDataSource; parent?: IDataSource }[] = tree.map(
    (node) => ({ node })
  );

  while (stack.length) {
    const { node, parent } = stack.pop()!;
    idMap.set(node.id, node);
    if (parent) parentMap.set(node.id, parent);
    node.childList?.forEach((child) =>
      stack.push({ node: child, parent: node })
    );
  }

  return { idMap, parentMap };
}

/** @function 批量更新所有子节点的checked状态 */
export function updateChildrenChecked(node: IDataSource, checked: boolean) {
  const stack = [node];
  while (stack.length) {
    const current = stack.pop()!;
    current.checked = checked;
    if (current.childList?.length) {
      stack.push(...current.childList);
    }
  }
}

/** @function 向上递归设置父节点checked状态 */
export function updateParentCheckedUpward(
  nodeId: string,
  parentMap: Map<string, IDataSource>
) {
  let currentId = nodeId;
  while (true) {
    const parent = parentMap.get(currentId);
    if (!parent) break;
    const allUnchecked = parent.childList?.every((child) => !child.checked);
    parent.checked = !allUnchecked;
    currentId = parent.id;
  }
}

/** @function 收集所有checked为true的节点id和permissionKey */
export function collectCheckedIdsAndKeys(tree: IDataSource[]) {
  const checkedIds: string[] = [];
  const checkedKeys: string[] = [];

  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.checked) {
      checkedIds.push(node.id);
      checkedKeys.push(node.permissionKey);
    }
    if (node.childList?.length) {
      stack.push(...node.childList);
    }
  }

  return { checkedIds, checkedKeys };
}

/** @function 设置某个节点的dataScope（通过dfs） */
export function setNodeDataScope(
  tree: IDataSource[],
  id: string,
  value: string
) {
  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.id === id) {
      node.dataScope = value;
      return true;
    }
    if (node.childList?.length) {
      stack.push(...node.childList);
    }
  }
  return false;
}

/** @function 获取所有已选中的节点及其dataScope */
export function collectCheckedMenuList(tree: IDataSource[]) {
  const result: { menuId: string; dataScopeEnum?: string }[] = [];
  const stack = [...tree];

  while (stack.length) {
    const node = stack.pop()!;
    if (node.checked) {
      result.push({ menuId: node.id, dataScopeEnum: node.dataScope });
    }
    if (node.childList?.length) {
      stack.push(...node.childList);
    }
  }

  return result;
}

/** @function 根据权限列表设置checked和dataScope，并清理空childList */
export function updateCheckedAndCleanEmptyChildren(
  tree: IDataSource[],
  permissions: { permissionKey: string; dataScope?: string }[]
): IDataSource[] {
  const keyToScopeMap = new Map<string, string | undefined>();
  permissions.forEach((item) => {
    keyToScopeMap.set(item.permissionKey, item.dataScope);
  });

  return tree.map((node) => {
    const newNode: IDataSource = {
      ...node,
      childList: undefined,
    };
    // 设置 checked 和 dataScope
    if (keyToScopeMap.has(newNode.permissionKey)) {
      newNode.checked = true;
      newNode.dataScope = keyToScopeMap.get(newNode.permissionKey);
    } else {
      newNode.checked = false;
      newNode.dataScope = undefined;
    }
    // 递归处理子节点
    if (Array.isArray(node.childList) && node.childList.length > 0) {
      const filteredChildren = updateCheckedAndCleanEmptyChildren(
        node.childList,
        permissions
      );
      if (filteredChildren.length > 0) {
        newNode.childList = filteredChildren;
      }
    }
    return newNode;
  });
}

/** @function 根据menuName模糊查询 */
export function filterPermissionTree(
  tree: IDataSource[],
  val: string
): IDataSource[] {
  const result: IDataSource[] = [];

  for (const item of tree) {
    const matched = item.menuName?.includes(val);
    const filteredChildren = item.childList
      ? filterPermissionTree(item.childList, val)
      : [];
    if (matched || filteredChildren.length > 0) {
      const newNode: IDataSource = {
        ...item,
        childList: filteredChildren.length > 0 ? filteredChildren : undefined,
      };
      result.push(newNode);
    }
  }

  return result;
}
