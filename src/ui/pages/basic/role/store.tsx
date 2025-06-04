import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useColumns } from "./columns";
import {
  get_role_detail,
  get_role_page,
  save_role,
  update_role,
} from "./service";

function RoleStore() {
  /**
   * @form 条件搜索 form
   */
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 角色配置 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 角色配置 table 分页 total
     */
    total: 0,
    /**
     * @current 角色配置 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 角色配置 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @editModalVisible 新增、编辑角色弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增角色
     */
    isCreate: false,
    /**
     * @updateModalData 记录角色配置 table 当前项 record
     */
    updateModalData: {} as any,
  });
  /**
   * @runGetData 分页查询角色
   */
  const runGetData = useImmerApi(get_role_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runSaveRole 新增角色
   */
  const runSaveRole = useImmerApi(save_role, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        logic.reset();
        // 关闭弹窗
        logic.closeEditModal();
        // 提示
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateRole 编辑角色
   */
  const runUpdateRole = useImmerApi(update_role, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        logic.reset();
        // 关闭弹窗
        logic.closeEditModal();
        // 提示
        message.success("编辑成功");
      } else {
        message.error(data?.msg ?? "编辑失败");
      }
    },
  });
  /**
   * @runGetRoleDetail 获取角色详情
   */
  const runGetRoleDetail = useImmerApi(get_role_detail, {
    onSuccess(value) {
      const { data } = value;
      editForm.setFieldsValue(data.data);
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取角色列表
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
      });
    },
    /**
     * @getRoleDetail 获取角色详情
     */
    getRoleDetail() {
      runGetRoleDetail.run({
        id: state.updateModalData.id,
      });
    },
    /**
     * @reset 重置条件搜索
     */
    reset() {
      form.resetFields();
      setState((d) => {
        d.current = 1;
      });
      const request = {
        size: state.pageSize,
        page: 1,
      };
      runGetData.run(request, true);
    },
    /**
     * @setCurrent 设置角色配置 table 分页当前页码
     */
    setCurrent(current: number) {
      setState((d) => {
        d.current = current;
      });
    },
    /**
     * @handleSearch 条件查询
     */
    handleSearch() {
      logic.setCurrent(1);
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 角色配置条件查询、table分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      runGetData.run(
        {
          size: pageSize ?? state.pageSize,
          page: page ?? state.current,
          roleName: values.roleName,
        },
        true
      );
    },
    /**
     * @onChangePageSize 角色配置 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @addModalSubmit 新增角色
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        runSaveRole.run(res);
      });
    },
    /**
     * @updateModalSubmit 编辑角色
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        const request = {
          ...res,
          id: state.updateModalData.id,
        };
        runUpdateRole.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增角色弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
    },
    /**
     * @closeEditModal 关闭新增、编辑角色弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑角色弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录角色配置 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
  });
  /**
   * @columns 角色配置 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @editForm 新增、编辑角色弹窗表单 form
   */
  const editForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveRole,
      runUpdateRole,
      runGetRoleDetail,
    },
    columns,
    editForm,
  };
}

export const { useSelector, Provider } = createStore(RoleStore);
