import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useColumns } from "./columns";
import {
  get_channel_detail,
  get_channel_type_tree,
  save_channel,
  save_channel_type,
  update_channel,
  update_channel_type,
} from "./service";
import { get_channel_page } from "../ChannelMangement/service";

function ChannelManagerStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 渠道管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 渠道管理 table 数据 total
     */
    total: 0,
    /**
     * @current 渠道管理 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 渠道管理 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @channelTypeTree 渠道分类树
     */
    channelTypeTree: [] as any[],
    /**
     * @editModalVisible 新增、编辑渠道弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增渠道
     */
    isCreate: false,
    /**
     * @updateModalData 记录渠道管理 table 当前项 record
     */
    updateModalData: {} as any,
    /**
     * @updateClassifyModalData 记录渠道分类树 当前项 record
     */
    updateClassifyModalData: {} as any,
    /**
     * @editClassifyModalVisible 新增、编辑渠道分类弹窗显示隐藏
     */
    editClassifyModalVisible: false,
    /**
     * @isCreateClassify 是否是新增渠道分类
     */
    isCreateClassify: false,
    /**@param sidebar当前选中的节点 */
    channelTypeId: "",
  });

  /**
   * @runGetData 获取渠道列表
   */
  const runGetData = useImmerApi(get_channel_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = +(data?.data?.total ?? 0);
      });
    },
  });
  /**
   * @runGetChannelTypeTree 获取渠道分类树
   */
  const runGetChannelTypeTree = useImmerApi(get_channel_type_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.channelTypeTree = data?.data ?? [];
      });
    },
  });
  /**
   * @runSaveChannelType 新增渠道分类
   */
  const runSaveChannelType = useImmerApi(save_channel_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getChannelTypeTree();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateChannelType 修改渠道分类
   */
  const runUpdateChannelType = useImmerApi(update_channel_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getChannelTypeTree();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runSaveChannel 新增渠道
   */
  const runSaveChannel = useImmerApi(save_channel, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateChannel 修改渠道
   */
  const runUpdateChannel = useImmerApi(update_channel, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runGetChannelDetail 获取渠道详情
   */
  const runGetChannelDetail = useImmerApi(get_channel_detail, {
    onSuccess(value) {
      const { data } = value;

      editForm.setFieldsValue(data.data);
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取渠道列表
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        enableFlag: true,
      });
    },
    /**
     * @getDataByTypeKey 根据左侧渠道分类，获取对应渠道列表
     */
    getDataByTypeKey(key: string) {
      setState((d) => {
        d.channelTypeId = key ?? "";
      });
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        channelTypeId: key,
        enableFlag: true,
      });
    },
    /**
     * @getChannelTypeTree 获取渠道分类树
     */
    getChannelTypeTree() {
      runGetChannelTypeTree.run();
    },
    /**
     * @saveChannelType 新增渠道分类
     */
    saveChannelType() {
      const values = editClassifyForm.getFieldsValue();
      runSaveChannelType.run(values);
    },
    /**
     * @updateChannelType 修改渠道分类
     */
    updateChannelType() {
      const values = editClassifyForm.getFieldsValue();
      const request = {
        ...values,
        id: state.updateClassifyModalData.key,
      };
      runUpdateChannelType.run(request);
    },
    /**
     * @getChannelDetail 获取渠道详情
     */
    getChannelDetail(id: number) {
      runGetChannelDetail.run({ id });
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
        enableFlag: true,
      };
      runGetData.run(request, true);
    },
    /**
     * @onSearch 条件搜索
     */
    onSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 条件搜索、分页改变后统一回调
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      const request = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        ...values,
      };
      runGetData.run(deleteEmptyKey(request), true);
    },
    /**
     * @onChangePageSize 渠道管理 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @addModalSubmit 新增渠道
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        runSaveChannel.run(res);
      });
    },
    /**
     * @updateModalSubmit 编辑渠道
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        const request = {
          ...res,
          id: state.updateModalData.id,
        };
        runUpdateChannel.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增渠道弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
      editForm.setFieldsValue({
        enableFlag: true,
        ...(state.channelTypeId ? { channelTypeId: state.channelTypeId } : {}),
      });
    },
    /**
     * @closeEditModal 关闭新增、编辑渠道弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑渠道弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录渠道管理 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
    /**
     * @setUpdateClassifyModalData 记录渠道分类树 当前项 record
     */
    setUpdateClassifyModalData(data: any) {
      setState((d) => {
        d.updateClassifyModalData = data;
      });
    },
    /**
     * @openEditClassifyModalCreate 打开新增分类弹窗
     */
    openEditClassifyModalCreate() {
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = true;
      });
    },
    /**
     * @openEditClassifyModalCreate 新增子分类
     */
    openEditClassifyModalCreateSon(node: any) {
      console.log(node);
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = true;
        d.updateClassifyModalData = { key: node };
      });
    },
    /**
     * @openEditClassifyModalCreate 编辑子分类
     */
    openEditClassifyModalUpdate(node: any) {
      console.log(node);
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = false;
        d.updateClassifyModalData = node;
      });
    },
    /**
     * @openEditClassifyModalCreate 关闭新增、编辑分类弹窗
     */
    closeEditClassifyModal() {
      setState((d) => {
        d.editClassifyModalVisible = false;
      });
    },
  });
  /**
   * @columns 渠道管理 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @columns 新增、编辑渠道弹窗 form
   */
  const editForm = Form.useForm()[0];
  /**
   * @columns 新增、编辑渠道分类 form
   */
  const editClassifyForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveChannelType,
      runUpdateChannelType,
      runSaveChannel,
      runUpdateChannel,
      runGetChannelDetail,
    },
    columns,
    editForm,
    editClassifyForm,
  };
}

export const { useSelector, Provider } = createStore(ChannelManagerStore);
