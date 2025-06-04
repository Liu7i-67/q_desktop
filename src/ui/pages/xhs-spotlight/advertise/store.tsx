import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useCol } from "./column";
import {
  delete_advertiser,
  get_xhs_advertiser,
  save_xhs_advertiser,
  update_xhs_advertiser,
} from "./service";

function AdvertiseStore() {
  const form = Form.useForm()[0];
  const editForm = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 小红书广告主 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 小红书广告主 table 分页 total
     */
    total: 0,
    /**
     * @current 小红书广告主 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 小红书广告主 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @pageSize 新增、修改广告主弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增广告主
     */
    isCreate: false,
    /**
     * @id 记录小红书广告主 table 当前项 id
     */
    id: "",
    /**
     * @selectedRowKeys 小红书广告主 table 选中项 keys
     */
    selectedRowKeys: [] as any[],
  });

  /**
   * @runGetAdvertiser 获取小红书广告主数据
   */
  const runGetAdvertiser = useImmerApi(get_xhs_advertiser, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        setState((d) => {
          d.dataSource = data?.data?.records || [];
          d.total = data?.data?.total || 0;
        });
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runUpdateAdvertiser 编辑广告主
   */
  const runUpdateAdvertiser = useImmerApi(update_xhs_advertiser, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        setState((d) => {
          d.id = "";
        });
        logic.closeEditModal();
        logic.getData();
        message.success("修改成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runSaveAdvertiser 新增广告主
   */
  const runSaveAdvertiser = useImmerApi(save_xhs_advertiser, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("新增成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runDeleteAdvertiser 删除广告主
   */
  const runDeleteAdvertiser = useImmerApi(delete_advertiser, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        setState((d) => {
          d.selectedRowKeys = [];
        });
        logic.getData();
        message.success("批量删除成功");
      } else {
        message.error(data.msg);
      }
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取广告主 table 数据源
     */
    getData() {
      const values = form.getFieldsValue();
      runGetAdvertiser.run(
        deleteEmptyKey({
          page: state.current,
          size: state.pageSize,
          ...values,
        }),
        true
      );
    },
    /**
     * @reset 重置条件查询
     */
    reset() {
      form.resetFields();
      setState((d) => {
        d.current = 1;
      });
      runGetAdvertiser.run(
        {
          size: state.pageSize,
          page: 1,
        },
        true
      );
    },
    /**
     * @onSearch 条件查询
     */
    onSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @onChangePageSize 小红书广告主 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @handleGetChangeAndSearchData 条件搜索、 table 分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      const request: { [key: string]: any } = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        ...values,
      };
      runGetAdvertiser.run(deleteEmptyKey(request), true);
    },
    /**
     * @openEditModal 打开编辑广告主弹窗
     */
    openEditModal(record: any) {
      editForm.setFieldsValue({
        advertiserName: record.advertiserName || "",
        phoneNumber: record.phoneNumber || "",
        memo: record.memo || "",
      });
      setState((d) => {
        (d.id = record.id), (d.editModalVisible = true);
        d.isCreate = false;
      });
    },
    /**
     * @openCreateModal 打开新增广告主弹窗
     */
    openCreateModal() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
    },
    /**
     * @closeEditModal 关闭新增、修改广告主弹窗
     */
    closeEditModal() {
      editForm.resetFields();
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @updateAdvertiser 修改广告主
     */
    updateAdvertiser() {
      const values = editForm.getFieldsValue();
      runUpdateAdvertiser.run(
        deleteEmptyKey({
          id: state.id,
          ...values,
        })
      );
    },
    /**
     * @createAdvertiser 新增广告主
     */
    createAdvertiser() {
      editForm.validateFields().then((values) => {
        runSaveAdvertiser.run(
          deleteEmptyKey({
            id: 0,
            ...values,
          })
        );
      });
    },
    /**
     * @handleSetSelectedRowKeys 记录 table 选中项 keys
     */
    handleSetSelectedRowKeys(selectedRowKeys: any[]) {
      setState((d) => {
        d.selectedRowKeys = selectedRowKeys;
      });
    },
    /**
     * @deleteAdvertiser 删除广告主
     */
    deleteAdvertiser() {
      runDeleteAdvertiser.run({
        idList: [...state.selectedRowKeys],
      });
    },
  });
  /**
   * @columns 小红书广告主 table columns
   */
  const columns = useCol({ logic });

  return {
    state,
    logic,
    form,
    editForm,
    api: {
      runGetAdvertiser,
      runUpdateAdvertiser,
      runSaveAdvertiser,
    },
    columns,
  };
}

export const { useSelector, Provider } = createStore(AdvertiseStore);
