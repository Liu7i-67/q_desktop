import { deleteEmptyKey, showErrorInfo, to } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useCol } from "./columns";
import {
  assign,
  batchDelete,
  get_channel_page,
  get_page,
  get_platform_page,
  get_region_tree,
  get_repeat_user,
  get_streamer_page,
  get_user_page,
  getCustomerLeadDetails,
  IDictionary,
  save,
  update,
} from "./service";
import { IRepeatResult } from "../customerManage/myCustomer/types";
import { Modal } from "@/components/TXModal";
import { get_customer_detail } from "../customerManage/myCustomer/service";
import { toUpload } from "@/utils/upload";

function CustomerLeadStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 表格数据源
     */
    dataSource: [] as any[],
    /**
     * @channel 广告渠道数据源
     */
    channel: [] as any[],
    /**
     * @platformList 平台数据源
     */
    platformList: [] as any[],
    /**
     * @streamerList 主播数据源
     */
    streamerList: [] as any[],
    /**
     * @regionTree 城市数据源
     */
    regionTree: [] as any[],
    /**
     * @consultantList 咨询师数据源
     */
    consultantList: [] as any[],
    /**
     * @total 表格数据总数
     */
    total: 0,
    /**
     * @total 表格当前页码
     */
    current: 1,
    /**
     * @total 表格当前页条数
     */
    pageSize: 20,
    /**
     * @addModalVisible 新增、修改弹窗显示隐藏
     */
    addModalVisible: false,
    /**
     * @isCreate 是否是新增
     */
    isCreate: false,
    /**
     * @updateModalId 修改项id
     */
    updateModalId: "",
    /**
     * @updateModalData 修改项接口数据
     */
    updateModalData: {} as IDictionary,
    /**
     * @updateRecord 修改项对应的表格数据
     */
    updateRecord: {} as any,
    /**
     * @coordinateModalVisible 线索分配弹窗显示隐藏
     */
    coordinateModalVisible: false,
    /**
     * @consultantTotal 咨询师下拉框数据总数
     */
    consultantTotal: 0,
    /**
     * @consultantCurrent 咨询师下拉框当前页码
     */
    consultantCurrent: 1,
    /**
     * @consultantPageSize 咨询师下拉框当前页条数
     */
    consultantPageSize: 20,
    /**
     * @channelTotal 渠道下拉框数据总数
     */
    channelTotal: 0,
    /**
     * @channelTotal 渠道下拉框当前页码
     */
    channelCurrent: 1,
    /**
     * @channelTotal 渠道下拉框当前页条数
     */
    channelPageSize: 20,
    /**
     * @streamerTotal 主播下拉框数据总数
     */
    streamerTotal: 0,
    /**
     * @streamerTotal 主播下拉框当前页码
     */
    streamerCurrent: 1,
    /**
     * @streamerTotal 主播下拉框当前页条数
     */
    streamerPageSize: 20,
    /**
     * @channelSearchValue 广告渠道下拉框搜索值
     */
    channelSearchValue: "",
    /**
     * @liveSearchValue 主播下拉框搜索值
     */
    liveSearchValue: "",
    /**
     * @customerPeekMsg 查重内容
     */
    customerPeekMsg: null as IRepeatResult | null,
    /** @param 编辑弹窗loading状态 */
    addModalLoading: false,
  });

  /**
   * @runGetData 获取客户线索
   */
  const runGetData = useImmerApi(get_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetChannelData 获取渠道
   */
  const runGetChannelData = useImmerApi(get_channel_page, {
    onSuccess(value) {
      const { data } = value;
      if (state.channelCurrent === 1) {
        setState((x) => {
          x.channel = data?.data?.records ?? [];
        });
      } else {
        setState((x) => {
          x.channel = [...x.channel, ...(data?.data?.records ?? [])];
        });
      }
      setState((x) => {
        x.channelTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetPlatformData 获取平台
   */
  const runGetPlatformData = useImmerApi(get_platform_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.platformList = data?.data?.records ?? [];
      });
    },
  });
  /**
   * @runGetStreamerData 获取主播
   */
  const runGetStreamerData = useImmerApi(get_streamer_page, {
    onSuccess(value) {
      const { data } = value;
      if (state.streamerCurrent === 1) {
        setState((x) => {
          x.streamerList = data?.data?.records ?? [];
        });
      } else {
        setState((x) => {
          x.streamerList = [...x.streamerList, ...(data?.data?.records ?? [])];
        });
      }
      setState((x) => {
        x.streamerTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetRegionTree 获取城市
   */
  const runGetRegionTree = useImmerApi(get_region_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.regionTree = data?.data ?? [];
      });
    },
  });
  /**
   * @runSave 新增客户线索
   */
  const runSave = useImmerApi(save, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        // 关闭弹窗
        logic.closeAddModal();
        // 刷新列表
        logic.reset();
        message.success("新增成功");
      } else {
        message.error(data.data.errorMsg);
      }
      setState((d) => {
        d.addModalLoading = false;
      });
    },
    onError() {
      setState((d) => {
        d.addModalLoading = false;
      });
    },
  });
  /**
   * @runUpdate 修改客户线索
   */
  const runUpdate = useImmerApi(update, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        // 关闭弹窗
        logic.closeAddModal();
        // 刷新列表
        logic.reset();
        message.success("修改成功");
      } else {
        message.error(data.data.errorMsg);
      }
      setState((d) => {
        d.addModalLoading = false;
      });
    },
    onError() {
      setState((d) => {
        d.addModalLoading = false;
      });
    },
  });
  /**
   * @runGetCustomerLeadDetails 获取线索详情
   */
  const runGetCustomerLeadDetails = useImmerApi(getCustomerLeadDetails, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && data.data) {
        const res = {
          ...data.data,
          wechatQrCode: data.data.wechatQrCode ? [data.data.wechatQrCode] : [],
        };
        setState((x) => {
          x.updateModalData = res;
        });
        addForm.setFieldsValue({
          ...res,
          channelName: {
            label: state.updateRecord.channelName,
            value: state.updateRecord.channelId,
          },
          liveStreamerName: {
            label: state.updateRecord.liveStreamerName,
            value: state.updateRecord.liveStreamerId,
          },
        });
      }
    },
  });
  /**
   * @runAssign 分配客户线索
   */
  const runAssign = useImmerApi(assign, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        // 关闭弹窗
        logic.closeCoordinateModal();
        // 刷新列表
        logic.reset();
        message.success("分配成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runGetUserPage 获取咨询师
   */
  const runGetUserPage = useImmerApi(get_user_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        // 如果是第一页，直接替换数据
        if (x.consultantCurrent === 1) {
          x.consultantList = data?.data?.records ?? [];
        } else {
          // 如果是加载更多，则合并数据并去重
          const newRecords = data?.data?.records ?? [];
          const existingIds = new Set(x.consultantList.map((item) => item.id));
          const uniqueNewRecords = newRecords.filter(
            (item: any) => !existingIds.has(item.id)
          );
          x.consultantList = [...x.consultantList, ...uniqueNewRecords];
        }
        x.consultantTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runDelete 删除客户线索
   */
  const runDelete = useImmerApi(batchDelete, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        logic.getData();
        message.success("删除成功");
      } else {
        message.error(data.msg);
      }
    },
  });

  /**
   * @runCustomerPeek 客户查重
   */
  const runCustomerPeek = useImmerApi(get_repeat_user, {
    onSuccess(res) {
      const { data } = res.data;
      setState((d) => {
        d.customerPeekMsg = data ?? null;
      });
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取客户线索
     */
    getData() {
      runGetData.run();
    },
    /**
     * @getChannelData 获取渠道
     */
    getChannelData() {
      runGetChannelData.run(
        {
          size: state.channelPageSize,
          page: state.channelCurrent,
          enableFlag: true,
        },
        true
      );
    },
    /**
     * @getPlatformData 获取平台
     */
    getPlatformData() {
      runGetPlatformData.run();
    },
    /**
     * @getStreamerData 获取主播
     */
    getStreamerData() {
      runGetStreamerData.run(
        {
          size: state.streamerPageSize,
          page: state.streamerCurrent,
        },
        true
      );
    },
    /**
     * @getRegionTree 获取城市
     */
    getRegionTree() {
      const request = {
        maxLevel: 2,
      };
      runGetRegionTree.run(request);
    },
    /**
     * @getCustomerLeadDetails 获取线索详情
     */
    getCustomerLeadDetails() {
      runGetCustomerLeadDetails.run({ id: state.updateModalId });
    },
    /**
     * @getCustomerLeadDetails 获取咨询师
     */
    getUserPage() {
      runGetUserPage.run({
        userType: "CONSULTANT",
        size: state.consultantPageSize,
        page: state.consultantCurrent,
        numberOfCustomerAssignedTodayFlag: true,
      });
    },
    /**
     * @reset 重置表格搜索条件
     */
    reset() {
      form.resetFields();
      const request = {
        size: state.pageSize,
        page: 1,
      };
      setState((d) => {
        d.current = 1;
      });
      runGetData.run(request, true);
    },
    /**
     * @onSearch 表格条件搜索
     */
    onSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 表格条件搜索、分页回调
     */
    handleGetChangeAndSearchData(page?: number, page_size?: number) {
      const values = form.getFieldsValue();
      const request: { [key: string]: any } = {
        size: page_size ?? state.pageSize,
        page: page ?? state.current,
        phoneNumber: values.phoneNumber,
        wechatNumber: values.wechatNumber,
        customerName: values.customerName,
        areaCode: values.areaCode,
        channelId: values.channelId,
        platformId: values.platformId,
        liveStreamerId: values.liveStreamerId,
        createTimeStart: values.createTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
        createTimeEnd: values.createTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
        assignTimeStart: values.assignTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
        assignTimeEnd: values.assignTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
      };
      runGetData.run(deleteEmptyKey(request), true);
    },
    /**
     * @onConsultantScroll 咨询师下拉框滚动加载
     */
    onConsultantScroll(page: number) {
      setState((d) => {
        d.consultantCurrent = page;
      });
      runGetUserPage.run({
        userType: "CONSULTANT",
        size: state.consultantPageSize,
        page,
      });
    },
    /**
     * @handleConsultantSearch 搜索咨询师
     */
    handleConsultantSearch(value: string) {
      setState((d) => {
        d.consultantCurrent = 1;
      });
      runGetUserPage.run({
        userType: "CONSULTANT",
        size: state.consultantPageSize,
        page: 1,
        userName: value,
      });
    },
    /**
     * @onChangePageSize 表格分页改变回调
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @openAddModal 显示新增、编辑弹窗
     */
    openAddModal() {
      setState((d) => {
        d.addModalVisible = true;
      });
    },
    /**
     * @closeAddModal 关闭新增、编辑弹窗
     */
    closeAddModal() {
      addForm.resetFields();
      setState((d) => {
        d.addModalVisible = false;
      });
    },
    /**
     * @openAddModalCreate 显示新增弹窗
     */
    openAddModalCreate() {
      setState((d) => {
        d.isCreate = true;
      });
    },
    /**
     * @openAddModalUpdate 设置弹窗类型
     */
    openAddModalUpdate() {
      addForm.resetFields();
      setState((d) => {
        d.isCreate = false;
      });
    },
    /**
     * @handleCalcLiveIdByLiveName 根据liveStreamerId查找liveStreamerName
     * @param liveStreamerName
     * @returns
     */
    handleCalcLiveIdByLiveName(liveStreamerName: string) {
      if (state.streamerList.length) {
        const item = state.streamerList.find(
          (item) => item.streamerName === liveStreamerName
        );
        if (item) {
          return item.id;
        } else {
          return state.updateRecord.liveStreamerId;
        }
      } else {
        return state.updateRecord.liveStreamerId;
      }
    },
    /**
     * @handleCalcChannelIdByChannleName 根据ChannleName查找ChannelId
     * @param channelName
     * @returns
     */
    handleCalcChannelIdByChannleName(channelName: string) {
      if (state.channel.length) {
        const item = state.channel.find(
          (item) => item.channelName === channelName
        );
        // 如果找到了，返回 id
        if (item) {
          return item.id;
        } else {
          // 如果没找到，直接用表格记录的 channelId
          return state.updateRecord.channelId;
        }
      } else {
        return state.updateRecord.channelId;
      }
    },
    /**
     * @addModalSubmit 新增客户线索
     */
    async addModalSubmit() {
      const res = await addForm.validateFields();
      setState((d) => {
        d.addModalLoading = true;
      });
      const wechatQrCodes = await toUpload(res.wechatQrCode);

      if (!wechatQrCodes) {
        setState((d) => {
          d.addModalLoading = false;
        });
        return;
      }

      const request = {
        ...res,
        wechatQrCode: wechatQrCodes?.[0],
        channelId: res.channelName?.value,
        liveStreamerId: res.liveStreamerName?.value,
        wechatNumber: res.wechatNumber
          ? res.wechatNumber.toLowerCase()
          : res.wechatNumber,
      };
      delete request["channelName"];
      delete request["liveStreamerName"];
      runSave.run(request);
    },
    /**
     * @updateModalSubmit 修改客户线索
     */
    async updateModalSubmit() {
      const res = await addForm.validateFields();
      setState((d) => {
        d.addModalLoading = true;
      });
      const wechatQrCodes = await toUpload(res.wechatQrCode);
      if (!wechatQrCodes) {
        setState((d) => {
          d.addModalLoading = false;
        });
        return;
      }

      const request = {
        ...res,
        wechatQrCode: wechatQrCodes?.[0],
        refundStatus: state.updateModalData.refundStatus,
        id: state.updateModalId,
        areaCode: res.areaCode || "",
        channelId: res.channelName?.value,
        liveStreamerId: res.liveStreamerName?.value,
        wechatNumber: res.wechatNumber
          ? res.wechatNumber.toLowerCase()
          : res.wechatNumber,
      };
      delete request["channelName"];
      delete request["liveStreamerName"];
      runUpdate.run(request);
    },
    /**
     * @setUpdateModalData 设置修改弹窗id
     */
    setUpdateModalId(data: any) {
      setState((d) => {
        d.updateModalId = data;
      });
    },
    /**
     * @setUpdateModalRecord 记录修改项对应的表格数据
     */
    setUpdateModalRecord(record: any) {
      setState((d) => {
        d.updateRecord = record;
      });
    },
    /**
     * @openCoordinateModal 显示指派弹窗
     */
    openCoordinateModal() {
      setState((d) => {
        d.coordinateModalVisible = true;
      });
    },
    /**
     * @openCoordinateModal 关闭指派弹窗
     */
    closeCoordinateModal() {
      coordinateForm.resetFields();
      setState((d) => {
        d.coordinateModalVisible = false;
      });
    },
    /**
     * @coordinateModalSubmit 指派弹窗确认回调
     */
    coordinateModalSubmit() {
      coordinateForm.validateFields().then((res) => {
        const request = {
          ...res,
          customerLeadsIdList: [state.updateModalId],
        };
        runAssign.run(request);
      });
    },
    /**
     * @setConsultantList 设置咨询师数据
     */
    setConsultantList(data: any[]) {
      setState((d) => {
        d.consultantList = data;
      });
    },
    /**
     * @setConsultantCurrent 设置咨询师当前页码
     */
    setConsultantCurrent(data: number) {
      setState((d) => {
        d.consultantCurrent = data;
      });
    },
    /**
     * @setChannelList 设置广告渠道数据
     */
    setChannelList(data: any[]) {
      setState((d) => {
        d.channel = data;
      });
    },
    /**
     * @setChannelCurrent 设置广告渠道当前页码
     */
    setChannelCurrent(data: number) {
      setState((d) => {
        d.channelCurrent = data;
      });
    },
    /**
     * @onChannelScroll 广告渠道滚动加载
     */
    onChannelScroll(page: number) {
      setState((d) => {
        d.channelCurrent = page;
      });
      runGetChannelData.run({
        size: state.channelPageSize,
        page,
        enableFlag: true,
      });
    },
    /**
     * @handleChannelSearch 广告渠道搜索
     */
    handleChannelSearch(value?: string) {
      setState((d) => {
        d.channelCurrent = 1;
      });

      const request = {
        size: state.channelPageSize,
        page: 1,
        channelName: value ?? state.channelSearchValue,
        enableFlag: true,
      };

      runGetChannelData.run(deleteEmptyKey(request));
    },
    /**
     * @handleChannelSearch 设置主播数据
     */
    setStreamerList(data: any[]) {
      setState((d) => {
        d.streamerList = data;
      });
    },
    /**
     * @setStreamerCurrent 设置主播当前页码
     */
    setStreamerCurrent(data: number) {
      setState((d) => {
        d.streamerCurrent = data;
      });
    },
    /**
     * @onStreamerScroll 主播滚动加载
     */
    onStreamerScroll(page: number) {
      setState((d) => {
        d.streamerCurrent = page;
      });
      runGetStreamerData.run({
        size: state.streamerPageSize,
        page,
      });
    },
    /**
     * @handleStreamerSearch 主播搜索
     */
    handleStreamerSearch(value?: string) {
      setState((d) => {
        d.streamerCurrent = 1;
      });
      runGetStreamerData.run(
        deleteEmptyKey({
          size: state.streamerPageSize,
          page: 1,
          streamerName: value ?? state.liveSearchValue,
        })
      );
    },
    /**
     * @setChannelSearchValue 记录广告渠道下拉框搜索值
     */
    setChannelSearchValue(value: string) {
      setState((d) => {
        d.channelSearchValue = value;
      });
    },
    /**
     * @setLiveSearchValue 记录主播下拉框搜索值
     */
    setLiveSearchValue(value: string) {
      setState((d) => {
        d.liveSearchValue = value;
      });
    },
    /** @function 检查客户是否有派单成交信息 */
    async checkCustomerStatus(customerId: string) {
      const [err, res] = await to(get_customer_detail({ id: customerId }));
      if (err || !res?.data) {
        showErrorInfo({
          err,
          res,
          msg: "查询客户派单成交信息失败",
        });
        return null;
      }

      if (!!res.data.lastDispatchDTO) {
        return true;
      }
      return ["DEAL", "REPEAT_PURCHASE"].includes(res.data.customerStatus);
    },
    /**
     * @handleDelete 删除客户线索
     */
    async handleDelete(record: any) {
      // 判断是否有客户id
      if (!record.customerId) {
        Modal.confirm({
          title: "删除确认",
          content: "确定要删除该线索渠道吗?",
          onOk: () => {
            runDelete.run({ idList: [record.id] });
          },
        });
        return;
      }

      const haveOtherInfo = await logic.checkCustomerStatus(record.customerId);

      if (haveOtherInfo === null) {
        return;
      }

      if (haveOtherInfo === false) {
        Modal.confirm({
          title: "删除确认",
          content: "确定要删除该线索渠道吗?",
          onOk: () => {
            runDelete.run({ idList: [record.id] });
          },
        });
        return;
      }
      Modal.confirm({
        title: "删除确认",
        content: "该客户已存在（派单/成交）信息，是否确认删除?",
        onOk: () => {
          runDelete.run({ idList: [record.id] });
        },
      });
    },
    /**
     * @checkCustomerPeek 客户查重
     * @param fieldKey
     */
    checkCustomerPeek(fieldKey: string) {
      const value = form.getFieldValue(fieldKey);
      if (!value || value === "") {
        return;
      }
      runCustomerPeek.run({
        keyword: value,
      });
    },
    /**
     * @closeCustPeekModal 关闭查重弹窗
     */
    closeCustPeekModal() {
      setState((d) => {
        d.customerPeekMsg = null;
      });
    },
  });
  /**
   * @columns table列定义
   */
  const columns = useCol({
    state,
    logic,
    api: {
      runDelete,
    },
  });
  /**
   * @addForm 新增、编辑客户线索弹窗表单索引
   */
  const addForm = Form.useForm()[0];
  /**
   * @coordinateForm 指派弹窗表单索引
   */
  const coordinateForm = Form.useForm()[0];
  return {
    state,
    form,
    addForm,
    coordinateForm,
    logic,
    api: {
      runGetData,
      runSave,
      runGetCustomerLeadDetails,
      runUpdate,
      runAssign,
      runGetUserPage,
      runGetChannelData,
      runGetStreamerData,
      runDelete,
      runCustomerPeek,
    },
    columns,
  };
}

export const { useSelector, Provider } = createStore(CustomerLeadStore);
