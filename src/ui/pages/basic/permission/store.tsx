import { useColumns } from "@/pages/basic/permission/columns";
import { ESearchType } from "@/pages/basic/permission/types";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import {
  get_menu_tree,
  get_role_page,
  get_target_permission,
  get_user_page,
  set_permission,
} from "./service";
import {
  cleanEmptyChildLists,
  collectCheckedIds,
  filterPermissionTree,
  findAndModifyChildListNode,
  findAndModifyParentListNode,
  findNodeIdsByPermissionKeys,
  getCheckedIds,
  markNodesByPermissionKeys,
  updateTreeNodeKey,
} from "./tools";

function PermissionStore() {
  /**
   * @tableSearchForm 权限 table 搜素表单 form
   */
  const tableSearchForm = Form.useForm()[0];

  /**
   * @sidebarPageSize 菜单栏分页 pageSize
   */
  const sidebarPageSize = 20;

  const [state, setState] = useImmer({
    /**
     * @sidebarSearchType 左侧搜索栏类型，默认为角色
     */
    sidebarSearchType: ESearchType.ROLE,
    /**
     * @sidebarList 左侧搜索栏列表数据
     */
    sidebarList: [] as any[],
    /**
     * @sidebarList 左侧搜索栏列表数据总数
     */
    sidebarListTotal: 0,
    /**
     * @sidebarList 左侧搜索栏当前页码
     */
    sidebarCurrent: 1,
    /**
     * @orginPermissionTree 第一次进入页面, 权限原始数据, 做个缓存, 切换角色/员工后, 需要重新计算当前角色/员工的权限, 通过 orginPermissionTree 计算
     */
    orginPermissionTree: [] as any[],
    /**
     * @permissionTree 当前角色/员工, 经过 swithc 或者 select 操作后的权限树数据
     */
    permissionTree: [] as any[],
    /**
     * @searchPermissionTree 当前角色/员工, 当前搜索权限后的权限数据, 基于 permissionTree 构造
     */
    searchPermissionTree: [] as any[],
    /**
     * @expandPermissionKeys 表格展开keys
     */
    expandPermissionKeys: [] as any[],
    /**
     * @permissionKeysList 选择项调接口返回的权限 keys 集合
     */
    permissionKeysList: [] as any[],
    /**
     * @permissions 选择项调接口返回的权限
     */
    permissions: [] as any[],
    /**
     * @currentSideId 当前侧边选中的项id
     */
    currentSideId: "",
  });

  /**
   * @runGetRoleList 获取角色列表
   */
  const runGetRoleList = useImmerApi(get_role_page, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.sidebarList = data?.data?.records ?? [];
        d.sidebarListTotal = data?.data?.total || 0;
        // 切换到角色时，默认选中第一个角色
        d.currentSideId = data?.data?.records?.[0]?.id ?? "";
      });
    },
  });

  /**
   * @runGetUserList 获取用户列表
   */
  const runGetUserList = useImmerApi(get_user_page, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.sidebarList = data?.data?.records ?? [];
        d.sidebarListTotal = data?.data?.total || 0;
        // 切换到员工时，默认选中第一个角色
        d.currentSideId = data?.data?.records?.[0]?.id ?? "";
      });
    },
  });
  /**
   * @runGetTargetPermission 查询选中项的权限
   */
  const runGetTargetPermission = useImmerApi(get_target_permission, {
    onSuccess(value) {
      const { data } = value;
      const permissions = data?.data || [];
      const permissionKeysList: any[] = permissions.map(
        (item: any) => item.permissionKey
      );
      logic.handleSetPermission({
        permissions,
        permissionKeysList,
      });
    },
  });
  /**
   * @runSetPermission 设置权限
   */
  const runSetPermission = useImmerApi(set_permission, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        message.success("设置成功");
        // 重新获取当前的权限
        logic.getTargetPermission();
        tableSearchForm.resetFields();
      } else {
        message.error(data.msg || "设置失败");
      }
    },
  });
  /**
   * @runGetPermissionTree 获取权限树
   */
  const runGetPermissionTree = useImmerApi(get_menu_tree, {
    onSuccess(value) {
      const { data } = value;
      const transformData = cleanEmptyChildLists(data?.data || []);
      setState((d) => {
        d.orginPermissionTree = [...transformData];
        d.permissionTree = [...transformData];
        d.searchPermissionTree = [...transformData];
      });
    },
  });

  const logic = useMethods({
    /**
     * @handleSetPermission 计算当前角色/员工的最新权限
     * @param params
     */
    handleSetPermission(params: {
      permissions: any[];
      permissionKeysList: any[];
    }) {
      const { permissions, permissionKeysList } = params;
      // 当前权限节点id及其子节点的ids
      const ids: any[] = findNodeIdsByPermissionKeys(
        [...state.orginPermissionTree],
        permissionKeysList
      );
      // 处理树，权限节点添加 checked 、回显 dataScope
      const dealTree = markNodesByPermissionKeys(
        [...state.orginPermissionTree],
        permissions
      );
      setState((d) => {
        d.searchPermissionTree = dealTree;
        d.permissionTree = dealTree;
        d.expandPermissionKeys = ids;
      });
      if (permissions) {
        setState((d) => {
          d.permissions = permissions;
        });
      }
    },
    /**
     * @getPermissionTree 获取权限树
     */
    getPermissionTree() {
      runGetPermissionTree.run();
    },
    /**
     * @getTargetPermission 查询选中项的权限
     */
    getTargetPermission() {
      runGetTargetPermission.run({
        targetEnum: state.sidebarSearchType,
        targetId: state.currentSideId,
      });
    },
    /**
     * @getRoleList 查询角色列表
     * @param page
     */
    getRoleList(page?: number) {
      const { query } = sideForm.getFieldsValue();
      if (page) {
        setState((d) => {
          d.sidebarCurrent = page;
        });
      }
      runGetRoleList.run(
        deleteEmptyKey({
          page: page ?? state.sidebarCurrent,
          size: sidebarPageSize,
          roleName: query ?? "",
        }),
        true
      );
    },
    /**
     * @getUserList 获取用户列表
     * @param page
     */
    getUserList(page?: number) {
      const { query } = sideForm.getFieldsValue();
      if (page) {
        setState((d) => {
          d.sidebarCurrent = page;
        });
      }
      runGetUserList.run(
        deleteEmptyKey({
          page: page ?? state.sidebarCurrent,
          size: sidebarPageSize,
          userName: query,
        }),
        true
      );
    },
    /**
     * @handleSiderBarSearch 侧边栏搜索
     * @param page
     */
    handleSiderBarSearch(page?: number, type?: ESearchType) {
      if ((type ?? state.sidebarSearchType) === ESearchType.ROLE) {
        this.getRoleList(page);
      } else {
        this.getUserList(page);
      }
    },
    /**
     * @handleSiderBarPageChange 侧边栏翻页
     * @param page
     */
    handleSiderBarPageChange(page: number) {
      setState((d) => {
        d.sidebarCurrent = page;
      });
      this.handleSiderBarSearch(page);
    },
    /**
     * @handleSiderBarTypeChange 切换侧边栏类型
     * @param type
     */
    handleSiderBarTypeChange(type: ESearchType) {
      setState((d) => {
        d.sidebarSearchType = type;
        d.sidebarCurrent = 1;
      });
      this.handleSiderBarSearch(1, type);
    },
    /**
     * @handleSetSideBarCurrent 设置侧边栏当前页码
     * @param current
     */
    handleSetSideBarCurrent(current: number) {
      setState((d) => {
        d.sidebarCurrent = current;
      });
    },
    /**
     * @sideBarItemClick 侧边项目点击事件
     * @param id
     */
    sideBarItemClick: (id: string) => {
      setState((d) => {
        d.currentSideId = id;
      });
    },
    /**
     * @handleSetDataScope 设置当前项的 dataScope 数据
     * @param dataScope 值
     * @param id 当前项id
     */
    handleSetDataScope(dataScope, id) {
      setState((d) => {
        d.searchPermissionTree = updateTreeNodeKey(
          [...state.searchPermissionTree],
          id,
          "dataScope",
          dataScope
        );
        d.permissionTree = updateTreeNodeKey(
          [...state.permissionTree],
          id,
          "dataScope",
          dataScope
        );
      });
    },
    /**
     * @handleSavePermission 保存权限
     */
    handleSavePermission() {
      runSetPermission.run({
        targetEnum: state.sidebarSearchType,
        targetId: state.currentSideId,
        enableMenuList: getCheckedIds(
          [...state.searchPermissionTree],
          [...state.permissionTree]
        ),
      });
    },
    /**
     * @handleSetPermissionTreeSwitch 表格项 switch 状态改变后回调
     * @param checked swtich 当前状态
     * @param record 表格对应的当前项数据
     */
    handleSetPermissionTreeSwitch(checked: boolean, record: any) {
      const { id } = record;
      // 处理当前节点及其子节点的 checked status
      const childListTree = findAndModifyChildListNode(
        // [...state.searchPermissionTree],
        [...state.permissionTree],
        id,
        checked
      );
      // 再处理处理当前节点祖先节点的 checked status，返回最终的 tree
      const finalTree = findAndModifyParentListNode(
        [...childListTree],
        id,
        checked
      );
      // 根据 checked status 更改后，设置需要展开的项
      const ids: any[] = collectCheckedIds(
        finalTree,
        state.expandPermissionKeys
      );
      // 这里 menuName 要兼容搜索时的操作
      const menuName = tableSearchForm.getFieldValue("menuName");
      setState((d) => {
        d.permissionTree = finalTree;
        d.searchPermissionTree = menuName
          ? filterPermissionTree(finalTree, "menuName", menuName)
          : finalTree;
        d.expandPermissionKeys = ids;
      });
    },
    /**
     * @handleSearchMenu 权限搜索
     */
    handleSearchMenu() {
      const menuName = tableSearchForm.getFieldValue("menuName") || "";
      const newTree = filterPermissionTree(
        [...state.permissionTree],
        "menuName",
        menuName
      );
      setState((d) => {
        d.searchPermissionTree = newTree;
      });
    },
    /**
     * @handleExpandRowsChange 表格展开回调
     * @param expandKeys 展开keys
     */
    handleExpandRowsChange: (expandKeys: readonly any[]) => {
      setState((d) => {
        d.expandPermissionKeys = [...expandKeys];
      });
    },
  });

  /**
   * @columns table列定义
   */
  const columns = useColumns(state, logic);

  /**
   * @sideForm 侧边表单
   */
  const sideForm = Form.useForm()[0];

  return {
    state,
    logic,
    api: {
      runGetPermissionTree,
      runGetTargetPermission,
      runGetRoleList,
      runGetUserList,
      runSetPermission,
    },
    tableSearchForm,
    columns,
    sideForm,
  };
}

export const { useSelector, Provider } = createStore(PermissionStore);
