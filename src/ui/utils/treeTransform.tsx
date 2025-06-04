import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

interface TreeData {
  title: string;
  value: string;
  children?: TreeData[];
}

// 转换城市数据格式为TreeSelect需要的格式
export const transformTreeData = (data: readonly any[]): TreeData[] => {
  return data.map((item) => ({
    title: item.areaName,
    value: item.areaCode,
    children: item.childList ? transformTreeData(item.childList) : undefined,
  }));
};

// 将树形数据转换为扁平的项目及子项目列表
export const getProjectOptions = (projectTree: readonly any[]) => {
  const convertToTreeOptions = (node: any): any => {
    const children: any[] = [];

    // 添加当前节点的项目
    node.projectDTOList?.forEach((project: any) => {
      children.push({
        label: project.projectName,
        value: project.id,
        checkable: true,
        className: "tree-node-selectable",
      });
    });

    // 处理子节点
    node.childList?.forEach((child: any) => {
      children.push(convertToTreeOptions(child));
    });

    return {
      label: node.typeName,
      value: `type-${node.id}`,
      disabled: true,
      checkable: false,
      className: "tree-node-disabled",
      children: children.length > 0 ? children : undefined,
    };
  };

  return projectTree?.map((node) => convertToTreeOptions(node)) || [];
};

/**
 * @param
 * @param fatherSelect 父节点是否可选
 * @param fatherDisabled 父节点是否禁用
 * @returns
 */
// 将树形数据转换为扁平的机构列表
export const getOrgTreeOptions = (
  orgTree: readonly any[],
  fatherSelect: boolean = false,
  fatherDisabled: boolean = true
) => {
  const convertToTreeOptions = (node: any): any => {
    const children: any[] = [];

    // 添加当前节点的机构
    node.dataList?.forEach((org: any) => {
      children.push({
        label: org.orgName,
        value: org.id,
        checkable: true,
        className: "tree-node-selectable",
      });
    });

    // 处理子节点
    node.childList?.forEach((child: any) => {
      children.push(convertToTreeOptions(child));
    });

    return {
      label: node.areaName,
      value: `area-${node.id}`,
      disabled: fatherDisabled,
      checkable: fatherSelect,
      className: "tree-node-disabled",
      children: children.length > 0 ? children : undefined,
    };
  };

  return orgTree?.map((node) => convertToTreeOptions(node)) || [];
};

// 转换机构分类树数据结构
export const convertToTreeData = (data: any) => {
  return data.map((item: any) => ({
    key: item.id,
    title: item.typeName,
    children: item.childList ? convertToTreeData(item.childList) : undefined,
    // 保存原始数据，以备需要
    data: {
      id: item.id,
      parentId: item.parentId,
      memo: item.memo,
      createTime: item.createTime,
      updateTime: item.updateTime,
    },
  }));
};

// 树节点标题渲染
export const titleRender = (props: {
  node: any;
  onAdd: (key: number) => void;
  onEdit: (node: any) => void;
  onDelete?: (node: any) => void;
  editPermission: boolean;
  createPermission: boolean;
  deletePermission?: boolean;
}) => {
  const {
    node,
    onAdd,
    onEdit,
    onDelete,
    editPermission,
    createPermission,
    deletePermission = false,
  } = props;
  return (
    <div className="flex items-center justify-between w-full">
      <span>{node.title}</span>
      <div className="opacity-0 hover:opacity-100 transition-opacity">
        {createPermission && (
          <Button
            type="link"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(node.key);
            }}
          >
            <PlusOutlined />
          </Button>
        )}
        {editPermission && (
          <Button
            type="link"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(node);
            }}
          >
            <EditOutlined />
          </Button>
        )}
        {deletePermission && (
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
                onDelete?.(node);
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
};

// 转换渠道分类树数据结构
export const transformToTree = (data: any) => {
  // 创建一个Map来存储所有节点，方便查找
  const nodeMap = new Map<number, any>();

  // 第一次遍历：创建所有节点及其子节点
  const createNode = (item: any) => {
    const node = {
      key: item.id,
      title: item.typeName,
      parentId: item.parentId,
      memo: item.memo,
      channelTypeFullName: item.channelTypeFullName,
      children:
        item.childList?.length > 0
          ? item.childList.map((child: any) => createNode(child))
          : undefined,
    };
    nodeMap.set(item.id, node);
    return node;
  };

  // 构建树形结构
  const result: any[] = [];
  data.forEach((item: any) => {
    // 只处理顶级节点
    if (!item.parentId) {
      result.push(createNode(item));
    }
  });

  return result;
};

// 处理项目树形数据
interface ProcessedNode {
  key: number;
  title: string;
  memo?: string;
  parentId?: number;
  createTime?: string;
  updateTime?: string;
  children?: any[]; // 将 children 标记为可选属性
  isLeaf: boolean;
}

export const processTreeData = (data: any) => {
  const processNode = (node: any) => {
    // 基础节点数据
    const processedNode: ProcessedNode = {
      key: node.id,
      title: node.typeName,
      memo: node.memo,
      parentId: node.parentId,
      createTime: node.createTime,
      updateTime: node.updateTime,
      children: [],
      isLeaf: false,
    };

    // 处理子分类
    if (node.childList && node.childList.length > 0) {
      (processedNode.children ??= []).push(
        ...node.childList.map((child: any) => processNode(child))
      );
    }

    // 处理项目列表
    if (node.projectDTOList && node.projectDTOList.length > 0) {
      (processedNode.children ??= []).push(
        ...node.projectDTOList.map((project: any) => ({
          key: `project-${project.id}`,
          title: project.projectName,
          isLeaf: true,
          isProject: true, // 标记为项目节点
          parentId: node.id,
          projectCode: project.projectCode,
          memo: project.memo,
          createTime: project.createTime,
          updateTime: project.updateTime,
          typeFullName: project.typeFullName,
          raw: project, // 保存原始数据
        }))
      );
    }

    // 如果没有子节点，设置为叶子节点
    if (processedNode.children?.length === 0) {
      delete processedNode.children;
      processedNode.isLeaf = true;
    }

    return processedNode;
  };

  return data.map((node: any) => processNode(node));
};

/**
 * @param data 部门数据
 * @param isMerge 是否需要合并
 * @returns
 */
// 处理部门树形数据
export const processDepartmentTreeData = (
  data: readonly any[],
  isMerge: Boolean = false,
  mergeProps: string = "userDTOList"
): any[] => {
  return data.map((item, index) => ({
    key: item.id,
    title: item.deptName,
    id: item.id,
    parentId: item.parentId,
    deptName: item.deptName,
    deptFullName: item.deptFullName,
    createTime: item.createTime,
    updateTime: item.updateTime,
    children:
      item.childList && item.childList.length > 0
        ? isMerge && item[mergeProps] && item[mergeProps].length > 0
          ? processDepartmentTreeData(
              handleMergeData(item.childList, item[mergeProps], index)
            )
          : processDepartmentTreeData(item.childList)
        : undefined,
  }));
};

/**
 * 合并childs和mergeData的数据使平级展示
 */
function handleMergeData(childList: any[], mergeData: any[], deep: Number) {
  const userData = mergeData.map((item) => ({
    key: item.id,
    id: item.id,
    phoneNumber: item.phoneNumber,
    deptName: item.userName,
    userType: item.userType,
    createTime: item.createTime,
    updateTime: item.updateTime,
  }));
  return childList.concat(userData);
}

/**
 * @param projectTree
 * @returns
 * 处理树形组件当有部门和人时，禁用<部门>只可勾选<人>
 * 拼接ID
 */
export const getuserOptions = (projectTree: readonly any[]) => {
  const convertToTreeOptions = (node: any, nodeIndex: number): any => {
    const children: any[] = [];
    // 添加当前节点的项目
    node.userDTOList?.forEach((user: any, index: number) => {
      children.push({
        label:
          (user.enableFlag ? "" : "【已禁用】") +
          user.userName +
          user.userAccount,
        value: user.id + "_" + index + "_" + nodeIndex,
        checkable: true,
      });
    });

    // 处理子节点
    node.childList?.forEach((child: any, childIndex: number) => {
      children.push(convertToTreeOptions(child, childIndex));
    });

    return {
      label: node.deptName,
      value: `type-${node.id}`,
      disabled: true,
      checkable: false,
      children: children.length > 0 ? children : undefined,
    };
  };

  return (
    projectTree?.map((node, nodeIndex) =>
      convertToTreeOptions(node, nodeIndex)
    ) || []
  );
};

/** @function 格式化小红书渠道选择数据 */
export const getXhsChannelSelectTree = (projectTree: readonly any[]) => {
  const convertToTreeOptions = (node: any): any => {
    const children: any[] = [];

    // 添加当前节点的项目
    node.channelDTOList?.forEach((project: any) => {
      let key = `${project.channelId}_${node.groupId}_${node.groupName}`;

      children.push({
        ...project,
        label: project.channelName,
        value: key,
        checkable: true,
        key,
      });
    });

    return {
      ...node,
      label: node.groupName,
      value: node.groupId,
      key: node.groupId,
      checkable: true,
      children: children.length > 0 ? children : undefined,
    };
  };

  return projectTree?.map((node) => convertToTreeOptions(node)) || [];
};

/** @function 获取渠道分类树 */
export const getChannelTreeOptions = (orgTree: readonly any[]) => {
  const convertToTreeOptions = (node: any): any => {
    const children: any[] = [];

    // 添加当前节点的机构
    node.channelChildList?.forEach((org: any) => {
      children.push({
        label: org.channelName,
        value: org.id,
        checkable: true,
        className: "tree-node-selectable",
      });
    });

    // 处理子节点
    node.childList?.forEach((child: any) => {
      children.push(convertToTreeOptions(child));
    });

    return {
      label: node.typeName,
      value: `type_${node.id}`,
      disabled: !children.length,
      checkable: true,
      className: "tree-node-disabled",
      children: children.length > 0 ? children : undefined,
    };
  };

  return orgTree?.map((node) => convertToTreeOptions(node)) || [];
};
