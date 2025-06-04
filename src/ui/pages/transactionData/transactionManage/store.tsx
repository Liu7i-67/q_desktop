import { EModalType } from "@/components/deal-confirm-modal/types";
import { getComitUser } from "@/pages/basic/employee/service";
import { baseUrl } from "@/utils/Axios";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useCol } from "./columns";
import {
  cancel_deal,
  confirm_deal,
  delete_deal,
  export_deal,
  get_deal_detail,
  get_deal_page,
} from "./service";
import { useRef } from "react";
import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";

function TransactionStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 交易管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 交易管理 table 分页 total
     */
    total: 0,
    /**
     * @current 交易管理 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 交易管理 table 分页 pageSize
     */
    pageSize: 20,
    // handleModalData: {} as any,
    /**
     * @currentDealId 当前成交id
     */
    currentDealId: "",
    /**
     * @handleModalVisible 确认弹窗显隐控制
     */
    handleModalVisible: false,
    /**
     * @descriptionData 成交详情弹窗数据
     */
    descriptionData: {} as any,
    /**
     * @isDeal 是否是确认处理
     */
    isDeal: false,
    /**
     * @employeeList 员工下拉框数据
     */
    employeeList: [] as any[],
    /**
     * @employeeTotal 员工下拉框数据 分页 total
     */
    employeeTotal: 0,
    /**
     * @employeeCurrent 员工下拉框数据 分页 current
     */
    employeeCurrent: 1,
    /**
     * @employeePageSize 员工下拉框数据 分页 pageSize
     */
    employeePageSize: 20,
    /**
     * @currentClickType 当前点击事件的类型
     */
    currentClickType: EModalType.Confirm,
    /**
     * @uploadExcelLoading 上传更新 excel loading
     */
    uploadExcelLoading: false,
    exportLoading: false,
  });
  /**
   * @runGetData 获取交易管理数据
   */
  const runGetData = useImmerApi(get_deal_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetTransactionDetail 获取成交详情数据
   */
  const runGetTransactionDetail = useImmerApi(get_deal_detail, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.descriptionData = data?.data;
      });
    },
  });
  /**
   * @runConfirmDeal 确认成交
   */
  const runConfirmDeal = useImmerApi(confirm_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.reset();
        logic.closeHandleModal();
        message.success("确认成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runCancelDeal 作废成交
   */
  const runCancelDeal = useImmerApi(cancel_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.reset();
        logic.closeHandleModal();
        message.success("作废成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runDeleteDeal 删除成交
   */
  const runDeleteDeal = useImmerApi(delete_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.reset();
        message.success("删除成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runExportExcel 导出 excel
   */
  const runExportExcel = useImmerApi(export_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        if (data.data?.fileDTO?.fullPath) {
          const link = document.createElement("a");
          link.href = data.data.fileDTO.fullPath;
          link.download = data.data.fileDTO.fileName || "成交信息导出.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          message.success("导出成功");
        } else if (data.data.exportAsync) {
          message.warning("本次操作后台处理中，请稍后到下载中心下载");
        } else if (data.data.noDataFlag) {
          message.warning("暂无数据");
        } else {
          message.error(data.msg);
        }
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runGetEmployee 获取员工
   */
  const runGetEmployee = useImmerApi(getComitUser, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        // x.employeeList = [...x.employeeList, ...(data?.data?.records ?? [])];
        // x.employeeTotal = data?.data?.total ?? 0;
        // 更换接口,换为树形结构
        x.employeeList = data?.data || [];
      });
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取交易管理
     */
    getData() {
      runGetData.run();
    },
    /**
     * @getTransactionDetail 获取成交详情
     */
    getTransactionDetail() {
      runGetTransactionDetail.run({ id: state.currentDealId });
    },
    /**
     * @exportExcel 导出 excel
     */
    exportExcel() {
      const values = form.getFieldsValue();
      const createUserIdList = values?.createUserIdList
        ? values.createUserIdList.map((item: string) => {
            return item.replace(/_.*$/, "");
          })
        : null;
      const { createTime, confirmTime } = values;
      const request = {
        ...values,
        createUserIdList: createUserIdList?.join(","),
        dealDateStart: confirmTime?.[0]?.startOf("day").format("YYYY-MM-DD"),
        dealDateEnd: confirmTime?.[1]?.endOf("day").format("YYYY-MM-DD"),
        createTimeStart: createTime?.[0]
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        createTimeEnd: createTime?.[1]
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        orgIdList: values.orgIdList ? values.orgIdList.join(",") : undefined,
      };
      // 移除空值
      Object.keys(request).forEach(
        (key) =>
          (request[key] === undefined || request[key] === "") &&
          delete request[key]
      );
      setState((o) => {
        o.exportLoading = true;
      });

      export_deal(request)
        .then((data) => {
          if (data.code === 200) {
            if (data.data?.fileDTO?.fullPath) {
              const link = document.createElement("a");
              link.href = data.data.fileDTO.fullPath;
              link.download = data.data.fileDTO.fileName || "成交信息导出.xlsx";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              message.success("导出成功");
            } else if (data.data.exportAsync) {
              message.warning("本次操作后台处理中，请稍后到下载中心下载");
            } else if (data.data.noDataFlag) {
              message.warning("暂无数据");
            } else {
              message.error(data.msg);
            }
          } else {
            message.error(data.msg);
          }
        })
        .finally(() => {
          setState((o) => {
            o.exportLoading = false;
          });
        });
      // runExportExcel.run(request);
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
     * @onSearch 条件查询
     */
    onSearch() {
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
      // 特殊处理传入的key
      const createUserIdList = values?.createUserIdList
        ? values.createUserIdList.map((item: string) => {
            return item.replace(/_.*$/, "");
          })
        : null;
      const request: { [key: string]: any } = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        createUserIdList: createUserIdList?.join(","),
        phoneNumber: values.phoneNumber,
        wechatNumber: values.wechatNumber,
        createTimeStart: values.createTime?.[0]
          ?.startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        createTimeEnd: values.createTime?.[1]
          ?.endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        dealDateStart: values.confirmTime?.[0]
          ?.startOf("day")
          .format("YYYY-MM-DD"),
        dealDateEnd: values.confirmTime?.[1]?.endOf("day").format("YYYY-MM-DD"),
        dealStatus: values.dealStatus || null,
        orgIdList: values.orgIdList ? values.orgIdList.join(",") : undefined,
      };
      runGetData.run(deleteEmptyKey(request), true);
    },
    /**
     * @confirmDeal 确认处理
     */
    confirmDeal() {
      const values = handleForm.getFieldsValue();
      const request = {
        ...values,
        confirmDate: values.confirmDate?.format("YYYY-MM-DD HH:mm:ss"),
        id: state.currentDealId,
      };
      runConfirmDeal.run(request);
    },
    /**
     * @cancelDeal 取消处理
     */
    cancelDeal() {
      const values = handleForm.getFieldsValue();
      const request = {
        ...values,
        id: state.currentDealId,
      };
      runCancelDeal.run(request);
    },
    /**
     * @deleteDeal 删除处理
     */
    deleteDeal(id: string) {
      runDeleteDeal.run({ id });
    },
    /**
     * @onChangePageSize 交易管理table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @setHandleModalData 记录交易管理 table 当前项 id
     */
    setHandleModalData(id: string) {
      setState((d) => {
        d.currentDealId = id;
      });
    },
    /**
     * @openHandleModalDeal 打开确认处理弹窗
     */
    openHandleModalDeal() {
      setState((d) => {
        d.handleModalVisible = true;
        d.isDeal = true;
      });
    },
    /**
     * @openHandleModalCancel 点击打开成交信息弹窗
     * @param type
     */
    openHandleModalCancel(type: EModalType) {
      setState((d) => {
        d.handleModalVisible = true;
        d.isDeal = false;
        d.currentClickType = type;
      });
    },
    /**
     * @closeHandleModal 关闭确认、作废处理弹窗
     */
    closeHandleModal() {
      setState((d) => {
        d.handleModalVisible = false;
        d.currentClickType = EModalType.Confirm;
      });
    },
    /**
     * @setEmployeeList 设置员工下拉框数据
     */
    setEmployeeList(list: any[]) {
      setState((x) => {
        x.employeeList = list;
      });
    },
    /**
     * @setEmployeeCurrent 设置员工下拉框分页 current
     */
    setEmployeeCurrent(current: number) {
      setState((d) => {
        d.employeeCurrent = current;
      });
    },
    /**
     * @handleEmployeeSearch 条件查询
     */
    handleEmployeeSearch: (searchValue: string) => {
      runGetEmployee.run({
        userName: searchValue,
        page: state.employeeCurrent,
        size: state.employeePageSize,
      });
    },
    /**
     * @onEmployeeScroll 员工下拉框滚动加载
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
     * @getEmployeeList 获取员工下拉框数据
     */
    getEmployeeList() {
      runGetEmployee.run({
        page: 1,
        size: state.employeePageSize,
      });
    },
    /**
     * @handleCloseDetailModal 交易管理 关闭详情弹窗
     */
    handleCloseDetailModal() {
      setState((d) => {
        d.handleModalVisible = false;
      });
    },
    /**
     * @handleOpenDetailModal 交易管理 打开详情弹窗
     */
    handleOpenDetailModal(type: EModalType) {
      setState((d) => {
        d.handleModalVisible = true;
        d.currentClickType = type;
      });
    },
    /**
     * @handleUploadExcel 上传更新 excel
     */
    handleUploadExcel: async (info: any) => {
      const file = info.file;
      if (file) {
        logic.handleSetUploadExcelLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${baseUrl}/api/business/v1/customer-deal/upload-and-update`,
          {
            method: "POST",
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
            body: formData,
          }
        );
        const result = await response.json();

        if (result.data) {
          message.success("数据正在处理中，请稍后刷新界面查看");
        } else {
          message.error(result.msg);
        }
        logic.handleSetUploadExcelLoading(false);
      }
    },
    /**
     * @handleSetUploadExcelLoading 上传更新 loading 设置
     */
    handleSetUploadExcelLoading(loading: boolean) {
      setState((d) => {
        d.uploadExcelLoading = loading;
      });
    },
  });
  const detailRef = useRef<ITransactionRecordDetailModalRef>(null);

  /**
   * @columns 交易管理 table columns
   */
  const columns = useCol({ logic, runDeleteDeal, detailRef });
  /**
   * @columns 确认、作废处理弹窗 form
   */
  const handleForm = Form.useForm()[0];

  return {
    state,
    form,
    handleForm,
    logic,
    api: {
      runGetData,
      runGetTransactionDetail,
      runConfirmDeal,
      runCancelDeal,
      runDeleteDeal,
      runExportExcel,
      runGetEmployee,
    },
    columns,
    detailRef,
  };
}

export const { useSelector, Provider } = createStore(TransactionStore);
