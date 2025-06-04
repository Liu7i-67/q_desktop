import { deptTree } from "@/pages/basic/employee/service";
import {
  get_export,
  get_panel_data,
  get_report_pagination,
} from "@/pages/reportFormsManage/service";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { deleteEmptyKey, exportDownload } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form } from "antd";
import dayjs from "dayjs";
import { IDealAmount, IPanelData } from "./interface";
import { useColumns } from "./teamPerformanceDetail/column";
import { useColumnsOverview } from "./teamPerformanceOverview/column";
import { useTeamChannelColumn } from "./teamPerformanceOverview/teamChannelColumn";
import { useTeamDetailColumns } from "./teamPerformanceOverview/teamDetailColumns";
import { useTeamPersonalDetailColumns } from "./teamPerformanceOverview/teamPersonalDetailColumns";
import { SorterResult } from "antd/es/table/interface";

function TeamStore() {
  const [state, setState] = useImmer({
    /**
     * @activeKey 团队业绩 tabs key
     */
    activeKey: "teamPanel",
    /**
     * @deptTree 部门下拉框数据
     */
    deptTree: [] as any[],
    /**
     * @panelData 团队业绩仪表盘数据
     */
    panelData: {} as IPanelData,
    /**
     * @dataSourceDetail 团队业绩明细 table 数据
     */
    dataSourceDetail: [] as any[],
    /**
     * @dataSourceOverview 团队业绩总览 table 数据
     */
    dataSourceOverview: [] as any[],
    /**
     * @totalOverview 团队业绩总览 table 数据总数
     */
    totalOverview: 0,
    /**
     * @currentOverview 团队业绩总览 table 分页当前页
     */
    currentOverview: 1,
    /**
     * @pageSizeOverview 团队业绩总览 table 分页条数
     */
    pageSizeOverview: 50,
    /**
     * @teamOverviewDetailDrawVisible 团队详情抽屉显示隐藏
     */
    teamOverviewDetailDrawVisible: false,
    /**
     * @teamOverviewDetailRecord 团队业绩总览 table record
     */
    teamOverviewDetailRecord: {} as any,
    /**
     * @teamOverviewDetailDataSource 团队业绩总览 table 数据源
     */
    teamOverviewDetailDataSource: [] as any[],
    /**
     * @teamOverviewDetailCurrent 团队业绩总览 table current
     */
    teamOverviewDetailCurrent: 1,
    /**
     * @teamOverviewDetailPageSize 团队业绩总览 table pageSize
     */
    teamOverviewDetailPageSize: 20,
    /** @param 排序字段 */
    teamOverviewDetailField: "amountOfDealByDealCreateTime",
    /** @param 是否升序 */
    teamOverviewDetailAsc: false,
    /**
     * @teamOverviewDetailTotal 团队业绩总览 table total
     */
    teamOverviewDetailTotal: 0,
    /**
     * @teamOverviewPersonalDrawVisible 员工详情抽屉显示隐藏
     */
    teamOverviewPersonalDrawVisible: false,
    /** @param 当前选中的业绩明细信息 */
    selectRange: null as IDealAmount | null,
    /**
     * @teamOverviewPersonalDetailRecord 员工详情抽屉 table record
     */
    teamOverviewPersonalDetailRecord: {} as any,
    /**
     * @teamOverviewPersonalDetailDataSource 员工详情抽屉 table 数据源
     */
    teamOverviewPersonalDetailDataSource: [] as any[],
    /**
     * @teamOverviewPersonalDetailCurrent 员工详情抽屉 table current
     */
    teamOverviewPersonalDetailCurrent: 1,
    /**
     * @teamOverviewPersonalDetailPageSize 员工详情抽屉 table pageSize
     */
    teamOverviewPersonalDetailPageSize: 20,
    /**
     * @teamOverviewPersonalDetailTotal 员工详情抽屉 table total
     */
    teamOverviewPersonalDetailTotal: 0,
    /**
     * @teamChannelDrawVisible 渠道详情抽屉显示隐藏
     */
    teamChannelDrawVisible: false,
    /**
     * @teamChannelDrawDataSource 渠道详情抽屉 table 数据源
     */
    teamChannelDrawDataSource: [] as any[],
    /**
     * @teamChannelDrawCurrent 渠道详情抽屉 table current
     */
    teamChannelDrawCurrent: 1,
    /**
     * @teamChannelDrawPageSize 渠道详情抽屉 table pageSize
     */
    teamChannelDrawPageSize: 20,
    /**
     * @teamChannelDrawTotal 渠道详情抽屉 table total
     */
    teamChannelDrawTotal: 0,
    /** @param 员工是否启用 */
    userEnableFlag: true as boolean | undefined,
  });

  /**
   * @runGetPanelData 获取团队业绩仪表盘
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
   * @runOverviewExport 团队/个人业绩导出
   */
  const runOverviewExport = useImmerApi(get_export, {
    onSuccess(value) {
      const { data } = value;
      exportDownload(data);
    },
  });
  /**
   * @runPersonOverviewExport 个人业绩导出
   */
  const runPersonOverviewExport = useImmerApi(get_export, {
    onSuccess(value) {
      const { data } = value;
      exportDownload(data);
    },
  });

  /**
   * @runGetReportPagination 获取团队表格数据
   */
  const runGetReportPagination = useImmerApi(get_report_pagination, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        if (state.activeKey === "teamPerformanceDetail") {
          x.dataSourceDetail = data?.data?.records || [];
        } else {
          x.dataSourceOverview = data?.data?.records || [];
          x.totalOverview = data?.data?.total || 0;
        }
      });
    },
  });
  /**
   * @runGetTeamReportOviewerDetail 获取团队详情
   */
  const runGetTeamReportOviewerDetail = useImmerApi(get_report_pagination, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.teamOverviewDetailDataSource = data?.data?.records || [];
        x.teamOverviewDetailTotal = data?.data?.total || 0;
      });
    },
  });
  /**
   * @runGetTeamReportPersonalOviewerDetail 获取员工明细
   */
  const runGetTeamReportPersonalOviewerDetail = useImmerApi(
    get_report_pagination,
    {
      onSuccess(value) {
        const { data } = value;
        setState((x) => {
          x.teamOverviewPersonalDetailDataSource =
            data?.data?.records?.map(
              (item: Record<string, any>, index: number) => {
                return {
                  ...item,
                  id: item?.id + Date.now() + index,
                };
              }
            ) || [];
          x.teamOverviewPersonalDetailTotal = data?.data?.total || 0;
        });
      },
    }
  );
  /**
   * @runGetTeamChannleDetail 获取渠道详情
   */
  const runGetTeamChannleDetail = useImmerApi(get_report_pagination, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.teamChannelDrawDataSource = data?.data?.records || [];
        x.teamChannelDrawTotal = data?.data?.total || 0;
      });
    },
  });
  /**
   * @runDeptTree 获取部门下拉框数据
   */
  const runDeptTree = useImmerApi(deptTree, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.deptTree = data?.data ?? {};
      });
    },
  });

  const logic = useMethods({
    /**
     * @getDeptTree 获取部门数据
     */
    getDeptTree() {
      runDeptTree.run();
    },
    /**
     * @setActiveKey 设置 tab keys
     */
    setActiveKey(key: string) {
      setState((x) => {
        x.activeKey = key;
      });
    },
    /**
     * @getPanelData 获取仪表盘数据
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
        deptIds: value?.dept
          ? value.dept.map((item: any) => item.value)
          : undefined,
      };
      runGetPanelData.run(
        deleteEmptyKey({
          request,
          code,
        })
      );
    },
    /**
     * @getReportDetailPagination 获取团队业绩明细
     */
    getReportDetailPagination(code: string) {
      const value = reportDetailForm.getFieldsValue();
      // 当前月份 dateString 形式
      const currentMonthAndDay = dayjs(value.dateRange).format("YYYY-MM");
      const startLocalDateTime = dayjs(currentMonthAndDay)
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const endLocalDateTime = dayjs(currentMonthAndDay)
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const request = {
        startLocalDateTime,
        endLocalDateTime,
        page: 1,
        size: 50,
        deptIds: value.dept
          ? value.dept.map((item: any) => item.value)
          : undefined,
      };
      runGetReportPagination.run(
        deleteEmptyKey({
          request,
          code,
        })
      );
    },
    /**
     * @getReportDetailPagination 获取团队业绩总览
     */
    getReportOverviewPagination(code: string) {
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        deptIds: value.dept
          ? value.dept.map((item: any) => item.value)
          : undefined,
        page: state.currentOverview,
        size: state.pageSizeOverview,
      };
      runGetReportPagination.run(
        deleteEmptyKey({
          request,
          code,
        })
      );
    },
    /**
     * @panelReset 团队业绩仪表盘搜索条件重置
     */
    panelReset() {
      panelForm.resetFields();
      logic.getPanelData(ReportCode.Team_Performance_Overview_Schedule);
    },
    /**
     * @onPanelSearch 团队业绩仪表盘条件搜索
     */
    onPanelSearch() {
      panelForm.validateFields().then(() => {
        logic.getPanelData(ReportCode.Team_Performance_Overview_Schedule);
      });
    },
    /**
     * @reportReset 团队业绩明细搜索条件重置
     */
    reportReset() {
      reportDetailForm.resetFields();
      logic.getReportDetailPagination(ReportCode.Team_Performance_Schedule);
    },
    /**
     * @onReportSearch 团队业绩明细条件搜索
     */
    onReportSearch() {
      reportDetailForm.validateFields().then(() => {
        logic.getReportDetailPagination(ReportCode.Team_Performance_Schedule);
      });
    },
    /**
     * @overviewReset 团队业绩总览搜索条件重置
     */
    overviewReset() {
      reportOverviewForm.resetFields();
      logic.getReportOverviewPagination(
        ReportCode.Team_Performance_Overview_Schedule
      );
    },
    /**
     * @onOverviewSearch 团队业绩总览条件搜索
     */
    onOverviewSearch() {
      reportOverviewForm.validateFields().then(() => {
        logic.getReportOverviewPagination(
          ReportCode.Team_Performance_Overview_Schedule
        );
      });
    },
    /**
     * @onChangePageSize 团队业绩总览表格分页改变
     */
    onChangePageSize(page: number, size: number) {
      const value = reportDetailForm.getFieldsValue();
      if (state.activeKey === "teamPerformanceDetail") {
      } else {
        setState((d) => {
          d.currentOverview = page;
          d.pageSizeOverview = size;
        });
      }
      // 当前月份 dateString 形式
      const currentMonthAndDay = dayjs(value.dateRange).format("YYYY-MM");
      const startLocalDateTime = dayjs(currentMonthAndDay)
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const endLocalDateTime = dayjs(currentMonthAndDay)
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const request = {
        startLocalDateTime,
        endLocalDateTime,
        page,
        size,
        deptIds: value.dept
          ? value.dept.map((item: any) => item.value)
          : undefined,
      };
      runGetReportPagination.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Team_Performance_Schedule,
        })
      );
    },

    /**
     * @overviewExport 团队业绩导出
     */
    overviewExport(code: string) {
      const value = reportOverviewForm.getFieldsValue();
      const data = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        deptIds: value?.dept
          ? value.dept.map((item: any) => item.value)
          : undefined,
        orderFieldName: "amountOfDealByDealCreateTime",
        orderDesc: true,
      };
      if (code === ReportCode.Team_Performance_Internal_Schedule) {
        runOverviewExport.run(
          deleteEmptyKey({
            data,
            code,
          })
        );
      } else if (ReportCode.Personal_Transaction_Schedule) {
        runPersonOverviewExport.run(
          deleteEmptyKey({
            data,
            code,
          })
        );
      }
    },
    /**
     * @openTeamPerformanceDraw 打开团队详情抽屉
     */
    openTeamPerformanceDraw(record: any) {
      setState((d) => {
        d.teamOverviewDetailDrawVisible = true;
        d.teamOverviewDetailRecord = record;
      });
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        // deptIds: value.dept
        //   ? value.dept.map((item: any) => item.value)
        //   : undefined,
        deptIds: [record.deptId],
        page: state.teamOverviewDetailCurrent,
        size: state.teamOverviewDetailPageSize,
        deptId: record.deptId,
        userEnableFlag: state.userEnableFlag,
        orderFieldName: state.teamOverviewDetailField,
        orderDesc: !state.teamOverviewDetailAsc,
      };
      runGetTeamReportOviewerDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Team_Performance_Internal_Schedule,
        })
      );
    },
    /** @function 修改排序方式 */
    onTeamPerformanceDrawChangeSort(sort: SorterResult<any>) {
      let teamOverviewDetailField =
        (sort.field as string) || "amountOfDealByDealCreateTime";
      let teamOverviewDetailAsc = sort.order ? sort.order === "ascend" : false;
      setState((d) => {
        d.teamOverviewDetailField = teamOverviewDetailField;
        d.teamOverviewDetailAsc = teamOverviewDetailAsc;
      });
      logic.onTeamPerformanceDrawChangePageSize(
        1,
        state.teamOverviewDetailPageSize,
        {
          orderFieldName: teamOverviewDetailField,
          orderDesc: !teamOverviewDetailAsc,
        }
      );
    },
    /**
     * @onTeamPerformanceDrawChangePageSize 团队详情抽屉table 分页改变
     */
    onTeamPerformanceDrawChangePageSize(
      page: number,
      size: number,
      extra?: {
        userEnableFlag?: boolean;
        orderFieldName?: string;
        orderDesc?: boolean;
      }
    ) {
      setState((d) => {
        d.teamOverviewDetailCurrent = page;
        d.teamOverviewDetailPageSize = size;
      });
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        // deptIds: value.dept
        //   ? value.dept.map((item: any) => item.value)
        //   : undefined,
        deptIds: [state.teamOverviewDetailRecord.deptId],
        page,
        size,
        deptId: state.teamOverviewDetailRecord.deptId,
        userEnableFlag: state.userEnableFlag,
        orderFieldName: state.teamOverviewDetailField,
        orderDesc: !state.teamOverviewDetailAsc,
        ...(extra || {}),
      };
      runGetTeamReportOviewerDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Team_Performance_Internal_Schedule,
        })
      );
    },
    /**
     * @closeTeamPerformanceDraw 关闭团队详情抽屉
     */
    closeTeamPerformanceDraw() {
      setState((d) => {
        d.teamOverviewDetailDrawVisible = false;
        d.teamOverviewDetailCurrent = 1;
        d.teamOverviewDetailPageSize = 20;
        d.teamOverviewDetailField = "amountOfDealByDealCreateTime";
        d.teamOverviewDetailAsc = false;
      });
    },
    /** @function 打开部门详情抽屉 */
    openTeamDetailDraw(record: any) {
      setState((d) => {
        d.teamOverviewPersonalDrawVisible = true;
        d.selectRange = record;
      });
      const value = reportDetailForm.getFieldsValue();
      const request = {
        startLocalDateTime: `${record.createDate} 00:00:00`,
        endLocalDateTime: `${record.createDate} 23:59:59`,
        deptIds: value.dept?.map((i: { value: string }) => i.value),
        page: state.teamOverviewPersonalDetailCurrent,
        size: state.teamOverviewPersonalDetailPageSize,
      };
      runGetTeamReportPersonalOviewerDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Personal_Transaction_Schedule,
        })
      );
    },

    /**
     * @openTeamPersonalPerformanceDraw 打开个人详情抽屉
     */
    openTeamPersonalPerformanceDraw(record: any) {
      setState((d) => {
        d.teamOverviewPersonalDrawVisible = true;
        d.teamOverviewPersonalDetailRecord = record;
      });
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: dayjs(value?.dateRange?.[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        deptId: state.teamOverviewDetailRecord.deptId,
        page: state.teamOverviewPersonalDetailCurrent,
        size: state.teamOverviewPersonalDetailPageSize,
        userIds: [record.userId],
      };
      runGetTeamReportPersonalOviewerDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Personal_Transaction_Schedule,
        })
      );
    },
    /**
     * @onTeamPersonalPerformanceDrawChangePageSize 个人详情抽屉 table 分页改变
     */
    onTeamPersonalPerformanceDrawChangePageSize(page: number, size: number) {
      setState((d) => {
        d.teamOverviewPersonalDetailCurrent = page;
        d.teamOverviewPersonalDetailPageSize = size;
      });

      let request;
      if (state.selectRange) {
        const value = reportDetailForm.getFieldsValue();
        request = {
          startLocalDateTime: `${state.selectRange.createDate} 00:00:00`,
          endLocalDateTime: `${state.selectRange.createDate} 23:59:59`,
          deptIds: value.dept?.map((i: { value: string }) => i.value),
          page,
          size,
        };
      } else {
        const value = reportOverviewForm.getFieldsValue();
        request = {
          startLocalDateTime: dayjs(value?.dateRange?.[0])
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          endLocalDateTime: dayjs(value?.dateRange?.[1])
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          page,
          size,
          userIds: [state.teamOverviewPersonalDetailRecord.userId],
        };
      }

      runGetTeamReportPersonalOviewerDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Personal_Transaction_Schedule,
        })
      );
    },
    /**
     * @closeTeamPersonalPerformanceDraw 关闭个人详情抽屉
     */
    closeTeamPersonalPerformanceDraw() {
      setState((d) => {
        d.teamOverviewPersonalDrawVisible = false;
        d.teamOverviewPersonalDetailCurrent = 1;
        d.teamOverviewPersonalDetailPageSize = 20;
        d.teamOverviewPersonalDetailDataSource = [];
        d.teamOverviewPersonalDetailTotal = 0;
        d.selectRange = null;
      });
    },
    /**
     * @param openChannelDetailDraw 打开渠道详情抽屉
     */
    openChannelDetailDraw(record: any) {
      setState((d) => {
        d.teamChannelDrawVisible = true;
        d.teamOverviewDetailRecord = record;
      });
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endLocalDateTime: dayjs(value?.dateRange?.[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        page: state.teamOverviewDetailCurrent,
        size: state.teamOverviewDetailPageSize,
        deptId: record?.deptId,
      };
      runGetTeamChannleDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Channel_Transaction_Schedule,
        })
      );
    },
    /**
     * @onTeamChannleDetalDrawChangePageSize 渠道详情table 分页改变
     * @param page
     * @param size
     */
    onTeamChannleDetalDrawChangePageSize(page: number, size: number) {
      setState((d) => {
        d.teamChannelDrawCurrent = page;
        d.teamChannelDrawPageSize = size;
      });
      const value = reportOverviewForm.getFieldsValue();
      const request = {
        startLocalDateTime: dayjs(value?.dateRange?.[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endLocalDateTime: dayjs(value?.dateRange?.[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        deptId: state.teamOverviewDetailRecord.deptId,
        page,
        size,
      };
      runGetTeamChannleDetail.run(
        deleteEmptyKey({
          request,
          code: ReportCode.Channel_Transaction_Schedule,
        })
      );
    },
    /**
     * @closeTeamChannelDraw 关闭渠道详情抽屉
     */
    closeTeamChannelDraw() {
      setState((d) => {
        d.teamChannelDrawVisible = false;
      });
    },
    /** @function 修改userEnableFlag */
    changeUserEnableFlag(flag: boolean | undefined) {
      console.log(flag);
      setState((o) => {
        o.userEnableFlag = flag;
      });
      logic.onTeamPerformanceDrawChangePageSize(
        1,
        state.teamOverviewDetailPageSize,
        {
          userEnableFlag: flag,
        }
      );
    },
  });

  /**
   * @columnsDetail 团队业绩明细 table columns
   */
  const columnsDetail = useColumns({ logic });
  /**
   * @columnsOverview 团队业绩总览 table columns
   */
  const columnsOverview = useColumnsOverview({ logic });
  /**
   * @channleColumn 渠道详情 table columns
   */
  const teamChannleColumn = useTeamChannelColumn({ logic });
  /**
   * @teamDetailColumns 组内明细 table columns
   */
  const teamDetailColumns = useTeamDetailColumns({ logic });
  /**
   * @teamPersonalDetailColumns 员工明细 table columns
   */
  const teamPersonalDetailColumns = useTeamPersonalDetailColumns({ logic });
  /**
   * @panelForm 团队业绩仪表盘 form
   */
  const panelForm = Form.useForm()[0];
  /**
   * @reportDetailForm 团队业绩明细 form
   */
  const reportDetailForm = Form.useForm()[0];
  /**
   * @reportOverviewForm 团队业绩总览 form
   */
  const reportOverviewForm = Form.useForm()[0];

  return {
    state,
    logic,
    panelForm,
    reportDetailForm,
    reportOverviewForm,
    api: {
      runDeptTree,
      runGetPanelData,
      runGetReportPagination,
      runGetTeamReportOviewerDetail,
      runGetTeamChannleDetail,
      runGetTeamReportPersonalOviewerDetail,
      runOverviewExport,
      runPersonOverviewExport,
    },
    columnsDetail,
    columnsOverview,
    teamChannleColumn,
    teamDetailColumns,
    teamPersonalDetailColumns,
  };
}

export const { useSelector, Provider } = createStore(TeamStore);
