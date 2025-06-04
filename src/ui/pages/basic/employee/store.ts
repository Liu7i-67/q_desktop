import { useCol } from "@/pages/basic/employee/columns";
import {
  deptTree,
  getEmployeeDetail,
  getPage,
  resetPsw,
  saveEmployee,
  updateEmployee,
} from "@/pages/basic/employee/service";
import { get_org_page } from "@/pages/orgManage/orgManager/service";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { get_role_page } from "../role/service";

function EmployeeStore() {
  const [state, setState] = useImmer({
    /**
     * @dataSource 员工配置 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 员工配置 table 分页 total
     */
    total: 0,
    /**
     * @current 员工配置 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 员工配置 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @deptTree 部门下拉框数据
     */
    deptTree: [] as any[],
    /**
     * @addModalVisible 新增、编辑员工弹窗显示隐藏
     */
    addModalVisible: false,
    /**
     * @isCreate 是否是新增员工
     */
    isCreate: true,
    /**
     * @updateModalData 记录员工配置 table 当前项 record
     */
    updateModalData: {} as any,
    /**
     * @roleList 角色下拉框数据
     */
    roleList: [] as any[],
    /**
     * @roleTotal 角色下拉框非农业total
     */
    roleTotal: 0,
    /**
     * @roleCurrent 角色下拉框分页current
     */
    roleCurrent: 1,
    /**
     * @rolePageSize 角色下拉框分页pageSize
     */
    rolePageSize: 20,
    /**
     * @orgList 机构下拉框数据
     */
    orgList: [] as any[],
    /**
     * @orgTotal 机构下拉框数据 分页 total
     */
    orgTotal: 0,
    /**
     * @orgCurrent 机构下拉框数据 分页 current
     */
    orgCurrent: 1,
    /**
     * @orgPageSize 机构下拉框数据 分页 pageSize
     */
    orgPageSize: 20,
  });

  /**
   * @runGetPage 分页查询员工
   */
  const runGetPage = useImmerApi(getPage, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.dataSource = data?.data?.records ?? [];
        d.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runDeptTree 获取部门树
   */
  const runDeptTree = useImmerApi(deptTree, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.deptTree = data?.data ?? {};
      });
    },
  });
  /**
   * @runGetRoleList 分页查询角色
   */
  const runGetRoleList = useImmerApi(get_role_page, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.roleList = [...d.roleList, ...(data?.data?.records ?? [])];
        d.roleTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runSaveEmployee 新增员工
   */
  const runSaveEmployee = useImmerApi(saveEmployee, {
    onSuccess(value: any) {
      const { data } = value;
      if (data.code === 200) {
        //logic.reset();
        logic.handleGetChangeAndSearchData(1);
        logic.closeAddModal();
        message.success("新增成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runUpdateEmployee 编辑员工
   */
  const runUpdateEmployee = useImmerApi(updateEmployee, {
    onSuccess(value: any) {
      const { data } = value;
      if (data.code === 200) {
        //  logic.reset();
        logic.handleGetChangeAndSearchData();
        logic.closeAddModal();
        message.success("修改成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runGetEmployeeDetail 获取员工详情
   */
  const runGetEmployeeDetail = useImmerApi(getEmployeeDetail, {
    onSuccess(value: any) {
      const { data } = value;
      // 先设置角色列表
      setState((d) => {
        d.roleList =
          data?.data?.roleRelationDTOList?.map((item: any) => ({
            id: item.roleId,
            roleName: item.roleName,
          })) || [];
      });

      // 处理表单数据
      const res = {
        ...data?.data,
        roleList: data?.data?.roleRelationDTOList?.map(
          (item: any) => item.roleId
        ),
        deptList: data?.data?.deptRelationDTOList?.map((item: any) => ({
          deptId: item.deptId,
          directorFlag: item.directorFlag,
        })),
      };
      addForm.setFieldsValue(res);
    },
  });
  /**
   * @runGetOrg 分页查询机构
   */
  const runGetOrg = useImmerApi(get_org_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.orgList = [...x.orgList, ...(data?.data?.records ?? [])];
        x.orgTotal = data?.data?.total ?? 0;
      });
    },
  });

  /**
   * @runResetPsw 重置密码
   */
  const runResetPsw = useImmerApi(resetPsw, {
    onSuccess(res) {
      const { data } = res;
      if (!data.data && data.code != 200) {
        message.warning("重置密码失败");
        return;
      }
      message.success("重置密码成功");
      logic.getPage();
    },
  });

  const logic = useMethods({
    /**
     * @getPage 获取员工 table 列表
     */
    getPage() {
      const request = {
        page: 1,
        size: 20,
      };
      runGetPage.run(request);
    },
    /**
     * @getDeptTree 获取部门下拉框数据
     */
    getDeptTree() {
      runDeptTree.run({
        ignorePermission: true,
      });
    },
    /**
     * @getRoleList 获取角色下拉框数据
     */
    getRoleList() {
      runGetRoleList.run({
        page: state.roleCurrent,
        size: state.rolePageSize,
      });
    },
    /**
     * @getEmployeeDetail 获取员工详情
     */
    getEmployeeDetail() {
      runGetEmployeeDetail.run({ id: state.updateModalData.id });
    },
    /**
     * @getOrgList 获取机构下拉框数据
     */
    getOrgList() {
      runGetOrg.run(
        {
          page: state.orgCurrent,
          size: state.orgPageSize,
          enableFlag: true,
        },
        true
      );
    },
    /**
     * @reset 重置条件搜索
     */
    reset() {
      searchForm.resetFields();
      setState((d) => {
        d.current = 1;
      });
      runGetPage.run(
        {
          page: 1,
          size: state.pageSize,
        },
        true
      );
    },
    /**
     * @handleSearch 条件搜索
     */
    handleSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 员工配置 条件搜索、table 分页改变后统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = searchForm.getFieldsValue();
      const request = {
        page: page ?? state.current,
        size: pageSize ?? state.pageSize,
        ...values,
      };
      runGetPage.run(deleteEmptyKey(request), true);
    },
    /**
     * @onChangePageSize table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @filterOrgIdByOrgName 根据机构名称过滤机构
     */
    filterOrgIdByOrgName(orgName) {
      return state.orgList.find((item) => item.orgName === orgName);
    },
    /**
     * @addFormSubmit 新增员工
     */
    addFormSubmit() {
      addForm.validateFields().then((res) => {
        const orgId = logic.filterOrgIdByOrgName(res.orgName)?.id;
        const request = {
          ...res,
          orgId,
        };
        delete request["orgName"];
        runSaveEmployee.run(deleteEmptyKey(request));
      });
    },
    /**
     * @updateFormSubmit 编辑员工
     */
    updateFormSubmit() {
      addForm.validateFields().then((res) => {
        const orgId = logic.filterOrgIdByOrgName(res.orgName)?.id;
        const request = {
          ...res,
          orgId,
          id: state.updateModalData.id,
          ignorePermission: true,
        };
        delete request["orgName"];
        runUpdateEmployee.run(request);
      });
    },
    /**
     * @openAddModalCreate 打开新增员工弹窗
     */
    openAddModalCreate() {
      setState((d) => {
        d.addModalVisible = true;
        d.isCreate = true;
      });
      addForm.setFieldValue("enableFlag", true);
    },
    /**
     * @openAddModalCreate 打开编辑员工弹窗
     */
    openAddModalUpdate() {
      setState((d) => {
        d.addModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @closeAddModal 关闭新增、编辑员工弹窗
     */
    closeAddModal() {
      setState((d) => {
        d.addModalVisible = false;
      });
    },
    /**
     * @setUpdateModalData 记录员工配置 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
    /**
     * @setRoleCurrent 设置角色分页查询 current
     */
    setRoleCurrent(current: number) {
      setState((d) => {
        d.current = current;
      });
    },
    /**
     * @onRoleScroll 角色下拉框滚动加载
     */
    onRoleScroll(searchValue: string, current: number) {
      logic.setRoleCurrent(current);
      runGetRoleList.run({
        roleName: searchValue,
        page: current,
        size: state.rolePageSize,
      });
    },
    /**
     * @setRoleList 设置角色列表
     */
    setRoleList(list: any[]) {
      setState((d) => {
        d.roleList = list;
      });
    },
    /**
     * @handleRoleSearch 角色下拉框搜索
     */
    handleRoleSearch(value: string) {
      setState((d) => {
        d.roleCurrent = 1;
      });
      runGetRoleList.run({
        roleName: value,
        page: 1,
        size: state.rolePageSize,
      });
    },
    /**
     * @handleOrgSearch 机构下拉框搜索
     */
    handleOrgSearch(searchValue: string) {
      runGetOrg.run({
        page: state.orgCurrent,
        size: state.orgPageSize,
        enableFlag: true,
        orgName: searchValue,
      });
    },
    /**
     * @onOrgScroll 机构下拉框滚动加载
     */
    onOrgScroll(current: number) {
      logic.setOrgCurrent(current);
      runGetOrg.run({
        page: current,
        size: state.orgPageSize,
        enableFlag: true,
      });
    },
    /**
     * @setOrgCurrent 设置机构分页查询 current
     */
    setOrgCurrent(current: number) {
      setState((d) => {
        d.orgCurrent = current;
      });
    },
    /**
     * @setOrgList 设置机构下拉框数据
     */
    setOrgList(list: any[]) {
      setState((d) => {
        d.orgList = list;
      });
    },
    /**
     * @onResetPsw 点击重置密码
     * @param id
     */
    onResetPsw(id: string) {
      runResetPsw.run({ id });
    },
  });
  /**
   * @columns 员工配置 table columns
   */
  const columns = useCol({ logic });
  /**
   * @searchForm 员工配置 table 条件查询 form
   */
  const searchForm = Form.useForm()[0];
  /**
   * @addForm 新增、编辑员工弹窗 form
   */
  const addForm = Form.useForm()[0];

  return {
    state,
    api: {
      runGetPage,
      runDeptTree,
      runGetRoleList,
      runSaveEmployee,
      runUpdateEmployee,
      runGetEmployeeDetail,
      runGetOrg,
      runResetPsw,
    },
    logic,
    columns,
    addForm,
    searchForm,
  };
}

export const { useSelector, Provider } = createStore(EmployeeStore);
