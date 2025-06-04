import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useColumns } from "./columns";
import {
  get_anchor_detail,
  get_anchor_page,
  save_anchor,
  update_anchor,
} from "./service";

function AnchorStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 主播管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 主播管理 table 数据 total
     */
    total: 0,
    /**
     * @current 主播管理 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 主播管理 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @editModalVisible 新增、编辑主播弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增主播
     */
    isCreate: false,
    /**
     * @updateModalId 记录主播管理 table 当前项 id
     */
    updateModalId: "",
  });
  /**
   * @runGetData 分页查询主播数据
   */
  const runGetData = useImmerApi(get_anchor_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runSaveAnchor 新增主播
   */
  const runSaveAnchor = useImmerApi(save_anchor, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        //logic.reset();
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
   * @runUpdateAnchor 修改主播
   */
  const runUpdateAnchor = useImmerApi(update_anchor, {
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
  /**
   * @runGetAnchorDetail 获取主播详情
   */
  const runGetAnchorDetail = useImmerApi(get_anchor_detail, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && data.data) {
        console.log(data.data);
        editForm.setFieldsValue(data.data);
      } else {
        message.error(data.msg);
      }
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取主播列表
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
      });
    },
    /**
     * @getAnchorDetail 获取主播详情
     */
    getAnchorDetail() {
      runGetAnchorDetail.run({ id: state.updateModalId });
    },
    /**
     * @reset 重置条件查询
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
     * @handleSearch 条件查询
     */
    handleSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 条件查询、table分页改变统一回调逻辑
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
     * @onChangePageSize 主播管理 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @addModalSubmit 新增主播
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        runSaveAnchor.run(res);
      });
    },
    /**
     * @updateModalSubmit 编辑主播
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        const request = {
          ...res,
          id: state.updateModalId,
        };
        runUpdateAnchor.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增主播弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
      editForm.setFieldValue("enableFlag", true);
    },
    /**
     * @closeEditModal 关闭新增、编辑主播弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑主播弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalId 记录主播管理 table 当前项 id
     */
    setUpdateModalId(id: string) {
      setState((d) => {
        d.updateModalId = id;
      });
    },
  });
  /**
   * @columns 主播管理 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @editForm 新增、编辑主播弹窗 form
   */
  const editForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveAnchor,
      runUpdateAnchor,
      runGetAnchorDetail,
    },
    columns,
    editForm,
  };
}

export const { useSelector, Provider } = createStore(AnchorStore);
