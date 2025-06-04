import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useColumns } from "./columns";
import { get_platform_page, save_platform, update_platform } from "./service";

function PlatformStore() {
  /**
   * @form 平台管理 table 搜索表单 form
   */
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 平台管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 平台管理 table 分页总数
     */
    total: 0,
    /**
     * @current 平台管理 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 平台管理 table pageSize
     */
    pageSize: 20,
    /**
     * @editModalVisible 新增、编辑平台弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增平台弹窗
     */
    isCreate: false,
    /**
     * @updateModalData 记录平台管理 table 当前项 record
     */
    updateModalData: {} as any,
  });

  /**
   * @runGetData 分页查询平台管理数据
   */
  const runGetData = useImmerApi(get_platform_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runSavePlatform 新增平台
   */
  const runSavePlatform = useImmerApi(save_platform, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        // logic.reset();
        logic.handleGetChangeAndSearchData(1);
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
   * @runUpdatePlatform 编辑平台
   */
  const runUpdatePlatform = useImmerApi(update_platform, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        // logic.reset();
        logic.handleGetChangeAndSearchData();
        // 关闭弹窗
        logic.closeEditModal();
        // 提示
        message.success("编辑成功");
      } else {
        message.error(data?.msg ?? "编辑失败");
      }
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取平台管理 table 数据
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
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
     * @handleSearch 条件搜索
     */
    handleSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 平台管理条件搜索、table分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      runGetData.run(
        deleteEmptyKey({
          size: pageSize ?? state.pageSize,
          page: page ?? state.current,
          ...values,
        }),
        true
      );
    },
    /**
     * @onChangePageSize 平台管理 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @addModalSubmit 新增平台
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        runSavePlatform.run(res);
      });
    },
    /**
     * @updateModalSubmit 修改平台
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        const request = {
          ...res,
          id: state.updateModalData.id,
        };
        runUpdatePlatform.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增平台弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
      editForm.setFieldValue("enableFlag", true);
    },
    /**
     * @closeEditModal 关闭新增、编辑平台弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑平台弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录平台管理 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
  });
  /**
   * @columns 平台管理 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @editForm 新增、编辑平台弹窗 form
   */
  const editForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSavePlatform,
      runUpdatePlatform,
    },
    columns,
    editForm,
  };
}

export const { useSelector, Provider } = createStore(PlatformStore);
