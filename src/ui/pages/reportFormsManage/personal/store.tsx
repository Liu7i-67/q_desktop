import {
  get_panel_data,
  get_report_pagination,
} from "@/pages/reportFormsManage/service";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form } from "antd";
import dayjs from "dayjs";
import { IDatasource, IPanelData } from "./interface";
import { useColumns } from "./personalPerformance/column";

function PersonalStore() {
  const [state, setState] = useImmer({
    /**
     * @activeKey 个人业绩 tab keys
     */
    activeKey: "personalPanel",
    /**
     * @panelData 个人业绩仪表盘数据
     */
    panelData: {} as IPanelData,
    /**
     * @dataSource 个人业绩明细 table 数据源
     */
    dataSource: [] as IDatasource[],
    /**
     * @total 个人业绩明细 table 数据 total
     */
    total: 0,
    /**
     * @page 个人业绩明细 table 分页当前页码
     */
    page: 1,
    /**
     * @size 个人业绩明细 table 分页条数
     */
    size: 20,
  });

  /**
   * @runGetPanelData 获取个人业绩仪表盘数据
   */
  const runGetPanelData = useImmerApi(get_panel_data, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.panelData = data.data;
      });
    },
  });
  /**
   * @runGetReportPagination 获取个人业绩明细数据
   */
  const runGetReportPagination = useImmerApi(get_report_pagination, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data.data.records || [];
        x.total = data.data.total || 0;
      });
    },
  });

  const logic = useMethods({
    /**
     * @setActiveKey 设置个人业绩 tabs keys
     */
    setActiveKey(key: string) {
      setState((x) => {
        x.activeKey = key;
      });
    },
    /**
     * @getPanelData 获取个人业绩仪表盘数据
     */
    getPanelData(code: string) {
      const value = panelForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      runGetPanelData.run(
        deleteEmptyKey({
          request,
          code,
        })
      );
    },
    /**
     * @getReportPagination 获取个人业绩明细 table 数据
     */
    getReportPagination(code: string, req?: { page?: number }) {
      const value = reportForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD 00:00:00"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD 23:59:59"),
        page: state.page,
        size: state.size,
        ...(req || {}),
      };
      runGetReportPagination.run(
        deleteEmptyKey({
          request,
          code,
        })
      );
    },
    /**
     * @panelReset 个人业绩仪表盘 重置条件查询
     */
    panelReset() {
      panelForm.resetFields();
      logic.getPanelData(ReportCode.Personal_Performance_Schedule);
    },
    /**
     * @onPanelSearch 个人业绩仪表盘 条件查询
     */
    onPanelSearch() {
      panelForm.validateFields().then(() => {
        logic.getPanelData(ReportCode.Personal_Performance_Schedule);
      });
    },
    /**
     * @reportReset 个人业绩明细 table 重置条件查询
     */
    reportReset() {
      setState((o) => {
        o.page = 1;
      });
      reportForm.resetFields();
      logic.getReportPagination(ReportCode.Personal_Performance_Schedule, {
        page: 1,
      });
    },
    /**
     * @onReportSearch 个人业绩明细 table 条件查询
     */
    onReportSearch() {
      setState((o) => {
        o.page = 1;
      });
      reportForm.validateFields().then(() => {
        logic.getReportPagination(ReportCode.Personal_Performance_Schedule, {
          page: 1,
        });
      });
    },
    /**
     * @onChangePageSize 个人业绩明细 table 分页改变
     */
    onChangePageSize(page: number, size: number) {
      const value = reportForm.getFieldsValue();
      setState((d) => {
        d.size = size;
        d.page = page;
      });
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0]).format(
          "YYYY-MM-DD 00:00:00"
        ),
        endLocalDateTime: dayjs(value?.dateRange?.[1]).format(
          "YYYY-MM-DD 23:59:59"
        ),
        page,
        size,
      };
      runGetReportPagination.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Personal_Performance_Schedule,
        })
      );
    },
  });

  /**
   * @columns 个人业绩明细 table columns
   */
  const columns = useColumns();
  /**
   * @panelForm 个人业绩仪表盘 搜索表单 form
   */
  const panelForm = Form.useForm()[0];
  /**
   * @reportForm 个人业绩明细 搜索表单 form
   */
  const reportForm = Form.useForm()[0];

  return {
    state,
    logic,
    panelForm,
    reportForm,
    api: {
      runGetPanelData,
      runGetReportPagination,
    },
    columns,
  };
}

export const { useSelector, Provider } = createStore(PersonalStore);
