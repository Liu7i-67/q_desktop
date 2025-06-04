import { get_dict_value } from "@/pages/basic/dictionary/service";
import { getPage } from "@/pages/basic/employee/service";
import { get_region_tree, get_user_page } from "@/pages/customerLead/service";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import dayjs from "dayjs";
import { useColumns } from "./columns";
import {
  get_collab_detail,
  get_customer_detail,
  get_customer_page,
  get_project_type_tree,
  get_repeat_user,
  merge_customer,
  save,
  transtion_customer,
  update,
  update_collab,
  UpdateModalData,
} from "./service";
import { IRepeatResult, ITranstionData, TransferType } from "./types";
import { IOption } from "@/utils/interface";
import { useRef } from "react";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";

function MyCustomerStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * 查重结果弹窗
     */
    isModalOpen: false,
    /**
     * @repeatResult 查重结果
     */
    repeatResult: null as IRepeatResult | null,
    /**
     * @dataSource 我的客户页面table 数据源
     */
    dataSource: [] as any[],
    /**
     * @coordinateDataSource 协作弹窗 table 数据源
     */
    coordinateDataSource: [] as any[],
    /**
     * @regionTree 城市下拉框数据
     */
    regionTree: [] as any[],
    /**
     * @dictValue 客户标签下拉框数据
     */
    dictValue: [] as any[],
    // /**
    //  * @consultantList 咨询师数据列表
    //  */
    // consultantList: [] as any[],
    /**
     * @total 我的客户 table 数据总数
     */
    total: 0,
    /**
     * @current 当前页码
     */
    current: 1,
    /**
     * @pageSize 当前页数量
     */
    pageSize: 20,
    /**
     * @editModalVisible 新增、编辑客户弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增客户
     */
    isCreate: true,
    /**
     * @updateModalId 我的客户页面 table，操作记录当前项id
     */
    updateModalId: "",
    /**
     * @updateModalData 我的客户页面 table，操作记录当前项 record
     */
    updateModalData: {} as UpdateModalData,
    /**
     * @coordinateModalVisible 协作弹窗显示隐藏
     */
    coordinateModalVisible: false,
    /**
     * @sendOrderModalVisible 派单弹窗显示隐藏
     */
    sendOrderModalVisible: false,
    /**
     * @detailDrawerVisible 详情抽屉显示隐藏
     */
    detailDrawerVisible: false,
    /**
     * @employeeList 协作弹窗 合作用户下拉框数据
     */
    employeeList: [] as any[],
    /**
     * @employeeTotal 协作弹窗 合作用户下拉框数据总数
     */
    employeeTotal: 0,
    /**
     * @employeeCurrent 协作弹窗 合作用户下拉框 current
     */
    employeeCurrent: 1,
    /**
     * @employeeCurrent 协作弹窗 合作用户下拉框 pageSize
     */
    employeePageSize: 20,
    /**
     * @mergeCustomerModalVisible 客户合并弹窗显示隐藏
     */
    mergeCustomerModalVisible: false,
    /**
     * @mergeCustomerTableData 客户合并 table 数据源
     */
    mergeCustomerTableData: [] as any[],
    /**
     * @mergeCustomerSelectedRowKeys 客户合并 table 选择项 key
     */
    mergeCustomerSelectedRowKeys: [] as any[],
    /**
     * @mergeCustomerSelectedRows 客户合并 table 选择项
     */
    mergeCustomerSelectedRows: [] as any[],
    /**
     * @projectTypeTree 首次咨询项目下拉框数据
     */
    projectTypeTree: [] as any[],
    /**
     * @transtionCustomerSelectedRowKeys 转移客户 table 选择项 key
     */
    transtionCustomerSelectedRowKeys: [] as any[],
    /**
     * @transtionCustomerSelectedRows 转移客户 table 选择项
     */
    transtionCustomerSelectedRows: [] as any[],
    /**
     * @transtionCustomerVisible 转移按钮点击后，表格选择是否可见
     */
    transtionCustomerVisible: false,
    /**
     * @transtionCustomerConfirmModalVisible 转移客户弹窗显示隐藏
     */
    transtionCustomerConfirmModalVisible: false,
    /**
     * @transtionScrollDataSource 批量转移、全量转移下拉框数据源
     */
    transtionScrollDataSource: [] as ITranstionData[],
    /**
     * @transtionScrollDataSourceTotal 批量转移、全量转移下拉框数据源总数
     */
    transtionScrollDataSourceTotal: 0,
    /**
     * @transtionScrollDataSourceCurrent 批量转移、全量转移下拉框 current
     */
    transtionScrollDataSourceCurrent: 1,
    /**
     * @transtionScrollDataSourceSize 批量转移、全量转移下拉框 pageSize
     */
    transtionScrollDataSourceSize: 20,
    /**
     * @transferUserId 接受客户转移的用户 id
     */
    transferUserId: "",
    /**
     * @allTransformVisible 全量转移弹窗 显示隐藏
     */
    allTransformVisible: false,
    /**
     * @transferType 转移类型，批量/全量
     */
    transferType: TransferType.SOME,
    /**
     * @tableSearchUserListTotal 客户所属人下拉框数据总数
     */
    tableSearchUserListTotal: 0,
    /**
     * @tableSearchUserListCurrent 客户所属人下拉框 current
     */
    tableSearchUserListCurrent: 1,
    /**
     * @tableSearchUserListSize 客户所属人下拉框 pageSize
     */
    tableSearchUserListSize: 20,
  });

  const collRef = useRef<ICollaborationModalRef>(null);
  const customerRef = useRef<ICustomerDrawerRef>(null);

  /**
   * 获取查重客户电话/微信
   */
  const runRepeatUser = useImmerApi(get_repeat_user, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.repeatResult = data?.data || null;
        x.isModalOpen = true;
      });
    },
  });

  /**
   * @runGetData 获取我的客户数据
   */
  const runGetData = useImmerApi(get_customer_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetSearchMergeCustomerData 合并客户弹窗 table 条件查询
   */
  const runGetSearchMergeCustomerData = useImmerApi(get_customer_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.mergeCustomerTableData = data?.data?.records ?? [];
      });
    },
  });
  /**
   * @runGetRegionTree 获取行政区划树
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
   * @runSave 新增客户
   */
  const runSave = useImmerApi(save, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        // 关闭弹窗
        logic.closeEditModal();
        // 刷新列表
        logic.handleGetChangeAndSearchData();
        message.success("新增成功");
      } else {
        message.error(data.data.errorMsg);
      }
    },
  });
  /**
   * @runUpdate 编辑客户
   */
  const runUpdate = useImmerApi(update, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        // 关闭弹窗
        logic.closeEditModal();
        // 刷新列表
        logic.handleGetChangeAndSearchData();
        message.success("修改成功");
      } else {
        message.error(data.data.errorMsg);
      }
    },
  });
  /**
   * @runGetDetail 获取客户详情
   */
  const runGetDetail = useImmerApi(get_customer_detail, {
    onSuccess(value) {
      const { data } = value;
      const res = {
        ...data.data,
        wechatPassTime: data.data.wechatPassTime
          ? dayjs(data.data.wechatPassTime)
          : undefined,
        labelValueList: data.data.labelRelationDTOList?.reduce(
          (prev: any[], item: any) => {
            return [
              ...prev,
              {
                value: item.labelValue,
                label: item.labelName,
              },
            ];
          },
          []
        ),
        intentionalProjectPostDTOList:
          data.data.intentionalProjectDTOList?.reduce(
            (prev: any[], item: any) => {
              return [...prev, item.dataId];
            },
            []
          ),
      };
      editForm.setFieldsValue(res);
    },
  });
  /**
   * @runGetDictValue 获取客户标签字典集
   */
  const runGetDictValue = useImmerApi(get_dict_value, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dictValue = data?.data ?? [];
      });
    },
  });
  /**
   * @runUpdateCollab 修改客户协作
   */
  const runUpdateCollab = useImmerApi(update_collab, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 关闭弹窗
        logic.closeCoordinateModal();
        // 刷新列表
        logic.handleGetChangeAndSearchData();
        message.success("修改成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runGetEmployee 客户协作弹窗 获取合作用户下拉框数据
   */
  const runGetEmployee = useImmerApi(getPage, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.employeeList = [...x.employeeList, ...(data?.data?.records ?? [])];
        x.employeeTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetCollabDetail 客户协作弹窗 获取客户协作 table 数据
   */
  const runGetCollabDetail = useImmerApi(get_collab_detail, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.coordinateDataSource = data?.data ?? [];
      });
    },
  });

  // const runGetUserPage = useImmerApi(get_user_page, {
  //   onSuccess(value) {
  //     const { data } = value;
  //     setState((x) => {
  //       x.consultantList = data?.data?.records ?? [];
  //     });
  //   },
  // });

  /**
   * @runGetTranstionUserPage 转移客户 table 数据源
   */
  const runGetTranstionUserPage = useImmerApi(get_user_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.transtionScrollDataSource = data?.data?.records ?? [];
        x.transtionScrollDataSourceTotal = data?.data?.total || 0;
      });
    },
  });
  /**
   * @runGetScrollUserPage 转移客户弹窗，客户下拉框数据
   */
  const runGetScrollUserPage = useImmerApi(get_user_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.transtionScrollDataSource = [
          ...x.transtionScrollDataSource,
          ...(data?.data?.records ?? []),
        ];
      });
    },
  });
  /**
   * @runMergeCustomer 客户合并
   */
  const runMergeCustomer = useImmerApi(merge_customer, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        mergeCustomerForm.resetFields();
        setState((d) => {
          d.mergeCustomerSelectedRowKeys = [];
          d.mergeCustomerSelectedRows = [];
          d.mergeCustomerModalVisible = false;
          d.mergeCustomerTableData = [];
        });
        message.success("合并成功");
        logic.getData();
      } else {
        message.error(data.data.errorMsg || "合并失败");
      }
    },
  });
  /**
   * @runTranstionCustomer 转移客户
   */
  const runTranstionCustomer = useImmerApi(transtion_customer, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && !data.data.errorMsg) {
        mergeCustomerForm.resetFields();
        if (state.transferType === TransferType.SOME) {
          setState((d) => {
            d.transtionCustomerSelectedRowKeys = [];
            d.transtionCustomerSelectedRows = [];
            d.transtionCustomerConfirmModalVisible = false;
            d.transtionCustomerVisible = false;
          });
        } else {
          setState((d) => {
            d.allTransformVisible = false;
          });
        }
        message.success("转移成功");
        logic.getData();
      } else {
        message.error(data.data.errorMsg || "转移成功");
      }
    },
  });
  /**
   * @runGetProjectTypeTree 获取项目分类树
   */
  const runGetProjectTypeTree = useImmerApi(get_project_type_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.projectTypeTree = data?.data ?? [];
      });
    },
  });

  const logic = useMethods({
    /** */
    closeModal() {
      setState((d) => {
        d.isModalOpen = false;
      });
    },
    /**
     * @getData 获取我的客户 table 数据
     */
    getRepeatUser(key: string) {
      const keyword = form.getFieldValue(key);
      if (!keyword) {
        message.warning("请输入查重电话/微信");
        return;
      }
      runRepeatUser.run({
        keyword,
      });
    },
    /**
     * @getData 获取我的客户 table 数据
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: 1,
      });
    },
    /**
     * @getTranstionScrollSeleData 获取转移客户 table 数据
     */
    getTranstionScrollSeleData() {
      runGetTranstionUserPage.run(
        {
          size: state.transtionScrollDataSourceSize,
          page: state.transtionScrollDataSourceCurrent,
          userType: "CONSULTANT",
        },
        true
      );
    },
    /**
     * @getScrollTranstionData 转移客户下拉框滚动加载
     */
    getScrollTranstionData(page) {
      setState((d) => {
        d.transtionScrollDataSourceCurrent = page;
      });
      runGetScrollUserPage.run(
        {
          size: state.transtionScrollDataSourceSize,
          // userType: "ORG",
          userType: "CONSULTANT",
          page,
        },
        true
      );
    },
    /**
     * @getRegionTree 获取所属城市下拉框数据
     */
    getRegionTree() {
      const request = {
        maxLevel: 2,
      };
      runGetRegionTree.run(request);
    },
    /**
     * @getDetail 获取客户详情
     */
    getDetail() {
      runGetDetail.run({ id: state.updateModalId });
    },
    /**
     * @getDictValue 获取客户标签字典集
     */
    getDictValue() {
      runGetDictValue.run({
        dictCodeList: "customer_label,cooperationStatus,doctorType,dealStatus",
      });
    },
    /**
     * @getProjectTypeTree 获取首次咨询项目下拉框数据
     */
    getProjectTypeTree() {
      runGetProjectTypeTree.run();
    },

    /**
     * @reset 重置我的客户条件搜素
     */
    reset() {
      form.resetFields();
      setState((d) => {
        d.current = 1;
      });
      runGetData.run(
        {
          size: state.pageSize,
          page: 1,
        },
        true
      );
    },
    /**
     * @onChangePageSize 我的客户 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @closeEditModal 关闭新增、编辑客户弹窗
     */
    closeEditModal() {
      setState((x) => {
        x.editModalVisible = false;
      });
    },
    /**
     * @openEditModal 打开新增、编辑客户弹窗
     */
    openEditModal() {
      setState((x) => {
        x.editModalVisible = true;
      });
    },
    /**
     * @openEditModalCreate 记录当前弹窗类型是新增客户
     */
    openEditModalCreate() {
      setState((x) => {
        x.isCreate = true;
      });
    },
    /**
     * @openEditModalUpdate 记录当前弹窗类型是编辑客户
     */
    openEditModalUpdate() {
      setState((x) => {
        x.isCreate = false;
      });
    },
    /**
     * @handleDealIntentionalProjectPostDTOList 新增、编辑客户，构造请求参数 intentionalProjectPostDTOList 字段
     */
    handleDealIntentionalProjectPostDTOList(data) {
      return data && data.length
        ? data.reduce((prev: any[], item: any) => {
            return [
              ...prev,
              {
                dataId: item,
                dataType: "PROJECT_TYPE",
              },
            ];
          }, [])
        : undefined;
    },
    /**
     * @handleJudgeHaveWechatOrPhone 校验是否填写了 微信或者电话
     */
    handleJudgeHaveWechatOrPhone() {
      const value = editForm.getFieldsValue();
      return value.wechatNumber || value.phoneNumber.some((item: any) => item);
    },
    /**
     * @handleJudgeInfoListIsEmpty 校验客户联系方式是否为空
     */
    handleJudgeInfoListIsEmpty(key: string) {
      const phoneNumber = editForm.getFieldValue(key);
      if (phoneNumber.every((p: string) => !p)) return [];
      return phoneNumber.reduce(
        (prev: any[], p: string) => (p ? [...prev, p] : prev),
        []
      );
    },
    /**
     * @addModalSubmit 新增客户
     */
    addModalSubmit() {
      if (!logic.handleJudgeHaveWechatOrPhone()) {
        message.error("请填写微信号或者客户电话");
        return;
      }
      editForm.validateFields().then((res) => {
        const hasDuplicateWeChat =
          new Set(
            logic
              .handleJudgeInfoListIsEmpty("wechatNumber")
              .map((s: string) => s.toLowerCase())
          ).size !== logic.handleJudgeInfoListIsEmpty("wechatNumber").length;
        const hasDuplicatePhone =
          new Set(logic.handleJudgeInfoListIsEmpty("phoneNumber")).size !==
          logic.handleJudgeInfoListIsEmpty("phoneNumber").length;
        if (hasDuplicateWeChat) {
          message.error("微信号重复（不区分大小写）,请重新填写");
          return;
        }
        if (hasDuplicatePhone) {
          message.error("电话号码重复,请重新填写");
          return;
        }
        runSave.run({
          ...res,
          labelValueList: res?.labelValueList?.map?.((o: IOption) => o.value),
          phoneNumber: logic.handleJudgeInfoListIsEmpty("phoneNumber"),
          wechatNumber: logic
            .handleJudgeInfoListIsEmpty("wechatNumber")
            ?.map((item: string) => item.toLowerCase()),
          intentionalProjectPostDTOList:
            logic.handleDealIntentionalProjectPostDTOList(
              res.intentionalProjectPostDTOList
            ),
        });
      });
    },
    /**
     * @addModalSubmit 编辑客户
     */
    async updateModalSubmit() {
      if (!logic.handleJudgeHaveWechatOrPhone()) {
        message.error("请填写微信号或者客户电话");
        return;
      }

      const res = await editForm.validateFields();

      const hasDuplicateWeChat =
        new Set(
          logic
            .handleJudgeInfoListIsEmpty("wechatNumber")
            .map((s: string) => s.toLowerCase())
        ).size !== logic.handleJudgeInfoListIsEmpty("wechatNumber").length;
      const hasDuplicatePhone =
        new Set(logic.handleJudgeInfoListIsEmpty("phoneNumber")).size !==
        logic.handleJudgeInfoListIsEmpty("phoneNumber").length;
      if (hasDuplicateWeChat) {
        message.error("微信号重复（不区分大小写）,请重新填写");
        return;
      }
      if (hasDuplicatePhone) {
        message.error("电话号码重复,请重新填写");
        return;
      }
      runUpdate.run({
        ...res,
        id: state.updateModalId,
        labelValueList: res?.labelValueList?.map?.((o: IOption) => o.value),
        phoneNumber: logic.handleJudgeInfoListIsEmpty("phoneNumber"),
        wechatNumber: logic
          .handleJudgeInfoListIsEmpty("wechatNumber")
          ?.map((item: string) => item.toLowerCase()),
        intentionalProjectPostDTOList:
          logic.handleDealIntentionalProjectPostDTOList(
            res.intentionalProjectPostDTOList
          ),
      });
    },
    /**
     * @setUpdateModalId 记录我的客户 table 当前项 id
     */
    setUpdateModalId(id: string) {
      setState((x) => {
        x.updateModalId = id;
      });
    },
    /**
     * @setUpdateModalData 记录我的客户 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((x) => {
        x.updateModalData = data;
      });
    },
    /**
     * @closeCoordinateModal 关闭协作弹窗
     */
    closeCoordinateModal() {
      setState((x) => {
        x.coordinateModalVisible = false;
      });
    },
    /**
     * @openCoordinateModal 打开协作弹窗
     */
    openCoordinateModal() {
      setState((x) => {
        x.coordinateModalVisible = true;
      });
    },
    /**
     * @coordinateModalSubmit 提交客户协作
     */
    coordinateModalSubmit() {
      const total = {
        OFFICIAL: 0,
        COLLABORATION: 0,
      };
      for (let record of state.coordinateDataSource) {
        if (!record.collabType) {
          message.error("存在合作类型未选择");
          return;
        }
        if (!record.userId) {
          message.error("存在合作用户未选择");
          return;
        }
        if (!record.ratio) {
          message.error("合作比率不能为0");
          return;
        }
        // @ts-ignore
        total[record.collabType] =
          // @ts-ignore
          (total[record.collabType] || 0) + (record.ratio || 0);
      }

      if (total.OFFICIAL && total.OFFICIAL !== 100) {
        message.error("官方合作比例相加必须为100%");
        return;
      }
      if (total.COLLABORATION !== 100) {
        message.error("协作合作比例相加必须为100%");
        return;
      }

      runUpdateCollab.run({
        collabPostDTOList: state.coordinateDataSource,
        customerId: state.updateModalId,
        dataType: "CUSTOMER",
        dataId: "",
      });
    },
    /**
     * @setCoordinateDataSource 记录客户协作弹窗当前数据（新增、删除操作）
     */
    setCoordinateDataSource(data: any[]) {
      setState((x) => {
        x.coordinateDataSource = data;
      });
    },
    /**
     * @openDetailDrawer 打开详情抽屉
     */
    openDetailDrawer() {
      setState((x) => {
        x.detailDrawerVisible = true;
      });
    },
    /**
     * @closeDetailDrawer 关闭详情抽屉
     */
    closeDetailDrawer() {
      setState((x) => {
        x.detailDrawerVisible = false;
      });
      localStorage.removeItem("updateModalId");
      localStorage.removeItem("updateModalData");
      // 刷新列表
      logic.handleGetChangeAndSearchData();
    },
    /**
     * @handleEmployeeSearch 协作弹窗，合作用户搜索
     */
    handleEmployeeSearch: (searchValue: string) => {
      runGetEmployee.run({
        userName: searchValue,
        page: state.employeeCurrent,
        size: state.employeePageSize,
      });
    },
    /**
     * @setEmployeeCurrent 协作弹窗，设置合作用户搜索下拉框 current
     */
    setEmployeeCurrent(current: number) {
      setState((x) => {
        x.employeeCurrent = current;
      });
    },
    /**
     * @setEmployeeList 协作弹窗，设置合作用户搜索下拉框数据
     */
    setEmployeeList(data: any[]) {
      setState((x) => {
        x.employeeList = data;
      });
    },
    /**
     * @onEmployeeScroll 协作弹窗，合作用户下拉框滚动加载
     */
    onEmployeeScroll(searchValue: string, current: number) {
      logic.setEmployeeCurrent(current);
      runGetEmployee.run({
        userName: searchValue,
        page: current,
        size: state.employeePageSize,
      });
    },
    /**
     * @onSearch 我的客户页面，条件搜索
     */
    onSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 我的客户页面，条件搜索、分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();

      // 客户所属人 特殊处理传入的key
      const ownerUserId = values?.ownerUserId
        ? values?.ownerUserId.replace(/_.*$/, "")
        : null;
      // 条件搜索是否选择了 "我的主单客户"
      const isSelect =
        values.onlyCollabType &&
        values.onlyCollabType !== "OFFICIAL" &&
        values.onlyCollabType !== "COLLABORATION";
      const request = {
        page: page ?? state.current,
        size: pageSize ?? state.pageSize,
        ...values,
        // ...expandValues,
        createTimeStart: values.createTime?.[0]?.format("YYYY-MM-DD HH:mm:ss"),
        createTimeEnd: values.createTime?.[1]
          ?.endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        // 优先客户所属人的值,如果没有选择客户所属人,再根据xx条件的值设置 ownerUserId
        ownerUserId:
          ownerUserId || (isSelect ? values.onlyCollabType : undefined),
        onlyCollabType: !isSelect ? values.onlyCollabType : undefined,
        ids: values.ids && values.ids !== "" ? [values.ids] : [],
        dealDateStart: values.dealDate?.[0]?.format("YYYY-MM-DD HH:mm:ss"),
        dealDateEnd: values.dealDate?.[1]
          ?.endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        labelRelationLabelValue: values.labelRelationLabelValue?.map(
          (item: Record<string, string>) => item.value
        ),
      };
      delete request["createTime"];
      delete request["createTime"];
      delete request["dealDate"];
      runGetData.run(request, true);
    },
    /**
     * @openSendOrderModal 打开派单弹窗
     */
    openSendOrderModal() {
      setState((x) => {
        x.sendOrderModalVisible = true;
      });
    },
    /**
     * @closeSendOrderModal 关闭派单弹窗
     */
    closeSendOrderModal() {
      setState((x) => {
        x.sendOrderModalVisible = false;
      });
      localStorage.removeItem("updateModalId");
      localStorage.removeItem("updateModalData");
    },
    // getUserPage() {
    //   runGetUserPage.run();
    // },
    /**
     * @getCollabDetail 获取协作弹窗 table 数据源
     */
    getCollabDetail() {
      runGetCollabDetail.run({ customerId: state.updateModalId });
    },
    /**
     * @openMergeCustomerModal 打开客户合并弹窗
     */
    openMergeCustomerModal() {
      setState((x) => {
        x.mergeCustomerModalVisible = true;
      });
    },
    /**
     * @closeMergeCustomerModal 关闭客户合并弹窗
     */
    closeMergeCustomerModal() {
      logic.handleResetSearchMergeCustomer();
      setState((d) => {
        d.mergeCustomerModalVisible = false;
      });
    },
    /**
     * @handleConfirmMergCustomer 客户合并弹窗确认按钮回调
     */
    handleConfirmMergCustomer() {
      if (state.mergeCustomerSelectedRowKeys.length) {
        runMergeCustomer.run({
          mergedCustomerId: state.mergeCustomerSelectedRowKeys[0],
          retainCustomerId: window.localStorage.getItem("updateModalId"),
        });
      }
    },
    /**
     * @handleResetSearchMergeCustomer 客户合并弹窗重置搜索
     */
    handleResetSearchMergeCustomer() {
      mergeCustomerForm.resetFields();
      setState((d) => {
        d.mergeCustomerTableData = [];
        d.mergeCustomerSelectedRows = [];
        d.mergeCustomerSelectedRowKeys = [];
      });
    },
    /**
     * @handleSearchMergeCustomer 客户合并弹窗条件搜索
     */
    handleSearchMergeCustomer() {
      const values = mergeCustomerForm.getFieldsValue();
      const request = {
        ...values,
      };
      // 移除空值
      Object.keys(request).forEach(
        (key) =>
          (request[key] === undefined || request[key] === "") &&
          delete request[key]
      );
      if (Object.keys(request).length) {
        runGetSearchMergeCustomerData.run(
          {
            ...request,
            page: 1,
            size: 20,
          },
          true
        );
      }
    },
    /**
     * @handleMergeCustomerSelectChange 客户合并弹窗 表格项选中
     */
    handleMergeCustomerSelectChange(
      newSelectedRowKeys: any[],
      selectedRows: any[]
    ) {
      setState((d) => {
        d.mergeCustomerSelectedRowKeys = newSelectedRowKeys;
        d.mergeCustomerSelectedRows = selectedRows;
      });
    },
    /**
     * @handleTranstionCustomerSelectChange 转移客户 表格选中项
     */
    handleTranstionCustomerSelectChange(
      newSelectedRowKeys: any[],
      selectedRows: any[]
    ) {
      setState((d) => {
        d.transtionCustomerSelectedRowKeys = newSelectedRowKeys;
        d.transtionCustomerSelectedRows = selectedRows;
      });
    },
    /**
     * @handleTranstionCustomerSelectChange 显示隐藏转移客户按钮
     */
    handleToggleTranstionCustonerVisible() {
      const cancelSelected = !state.transtionCustomerVisible;
      setState((d) => {
        d.transtionCustomerVisible = !d.transtionCustomerVisible;
        d.transtionCustomerSelectedRowKeys = cancelSelected
          ? []
          : [...d.transtionCustomerSelectedRowKeys];
        d.transtionCustomerSelectedRows = cancelSelected
          ? []
          : [...d.transtionCustomerSelectedRows];
      });
    },
    /**
     * @openTranstionCustomerConfigModal 打开批量转移弹窗
     */
    openTranstionCustomerConfigModal() {
      setState((d) => {
        d.transtionCustomerConfirmModalVisible = true;
      });
    },
    /**
     * @closeTranstionCustomerConfigModal 关闭批量转移弹窗
     */
    closeTranstionCustomerConfigModal() {
      setState((d) => {
        d.transtionCustomerConfirmModalVisible = false;
      });
    },
    /**
     * @handleSetTransferUserId 记录接受转移客户的用户id
     */
    handleSetTransferUserId(transferUserId: string) {
      setState((d) => {
        d.transferUserId = transferUserId;
      });
    },
    /**
     * @handleConfirmTrastionCustomer 批量转移客户弹窗确认回调
     */
    handleConfirmTrastionCustomer() {
      if (
        !state.transferUserId ||
        !state.transtionCustomerSelectedRowKeys.length
      ) {
        return;
      }
      runTranstionCustomer.run({
        transferUserId: state.transferUserId,
        targetCustomerIds: state.transtionCustomerSelectedRowKeys,
      });
    },
    /**
     * @handleAllTrastionCustomer 全量转移客户弹窗确认回调
     */
    handleAllTrastionCustomer() {
      const optionValues = form.getFieldsValue();
      runTranstionCustomer.run(
        deleteEmptyKey({
          ...optionValues,
          ownerUserId: optionValues?.ownerUserId
            ? optionValues?.ownerUserId.replace(/_.*$/, "")
            : null,
          transferUserId: state.transferUserId,
        })
      );
    },
    /**
     * @handleToggleAllTransformModalVisible 显示隐藏全量转移客户弹窗
     */
    handleToggleAllTransformModalVisible() {
      setState((d) => {
        d.allTransformVisible = !d.allTransformVisible;
      });
    },
    /**
     * @handleSetTransferType 记录转移客户类型（批量、全量）
     */
    handleSetTransferType(type: TransferType) {
      setState((d) => {
        d.transferType = type;
      });
    },
    /**
     * @setTranstionList 批量、全量转移弹窗，设置用户下拉框数据列表
     */
    setTranstionList(data: any[]) {
      setState((d) => {
        d.transtionScrollDataSource = data;
      });
    },
    /**
     * @setTranstionCurrent 批量、全量转移弹窗，设置用户下拉框 current
     */
    setTranstionCurrent(data: number) {
      setState((d) => {
        d.transtionScrollDataSourceCurrent = data;
      });
    },
    /**
     * @handleTranstionSearch 批量、全量转移弹窗，下拉框查询搜索
     */
    handleTranstionSearch(value: string) {
      setState((d) => {
        d.transtionScrollDataSourceCurrent = 1;
      });
      runGetTranstionUserPage.run({
        size: state.transtionScrollDataSourceSize,
        page: 1,
        userName: value,
        userType: "CONSULTANT",
      });
    },
    /**
     * @setUserListCurrent 设置客户所属人下拉框 current
     */
    setUserListCurrent(page: number) {
      setState((d) => {
        d.tableSearchUserListCurrent = page;
      });
    },
  });

  /**
   * @columns 我的客户table columns
   */
  const columns = useColumns({ state, logic, collRef, customerRef });
  /**
   * @editForm 新增、编辑客户弹窗 form
   */
  const editForm = Form.useForm()[0];
  /**
   * @sendOrderForm 派单弹窗 form
   */
  const sendOrderForm = Form.useForm()[0];
  /**
   * @mergeCustomerForm 合并客户弹窗 form
   */
  const mergeCustomerForm = Form.useForm()[0];

  return {
    state,
    form,
    editForm,
    sendOrderForm,
    mergeCustomerForm,
    logic,
    api: {
      runGetData,
      runSave,
      runUpdate,
      runGetDetail,
      runUpdateCollab,
      runGetEmployee,
      // runGetUserPage,
      runGetCollabDetail,
      runGetSearchMergeCustomerData,
      runMergeCustomer,
      runTranstionCustomer,
      runGetScrollUserPage,
      runRepeatUser,
    },
    columns,
    collRef,
    customerRef,
  };
}

export const { useSelector, Provider } = createStore(MyCustomerStore);
