import { deptTree } from "@/pages/basic/employee/service";
import { get_channel_type_tree } from "@/pages/channel/channelManage/service";
import {
  get_channel_group,
  get_export,
  get_panel_data,
} from "@/pages/reportFormsManage/service";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { exportDownload } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import Big from "big.js";
import dayjs from "dayjs";

function ReportFormsStore() {
  const [state, setState] = useImmer({
    /**
     * @deptTree 部门下拉框数据
     */
    deptTree: [] as any[],
    /**
     * @panelData 仪表盘数据
     */
    panelData: [] as any[],
    /**
     * @activeTag tabs keys
     */
    activeTag: "none",
    /**
     * @isStatistics 是否是统计 tab key
     */
    isStatistics: false,
    /**
     * @importantList 重要列表
     */
    importantList: [] as any[],
    /**
     * @tableDataSource 表格数据
     */
    tableDataSource: [] as any[],
    /**
     * @importantTotal 重要地区总计
     */
    importantTotal: 0,
    /**
     * @importantTotalPercentage 重点地区占比
     */
    importantTotalPercentage: 0,
    /**
     * @channelTypeTree 渠道分类树
     */
    channelTypeTree: [] as any[],
    /**
     * @channelGroup 渠道分组数据
     */
    channelGroup: [] as any[],
  });

  /**
   * @calculatePercentage 计算占比
   * @param data
   */
  const calculatePercentage = (data: any[]) => {
    // 计算该层的总和
    const total = data.reduce(
      (sum, item) => sum.plus(new Big(item.value)),
      new Big(0)
    );

    // 计算每一项的占比
    return data.map((item) => {
      const percentage = new Big(item.value).div(total).times(100); // 使用 Big.js 计算占比
      return {
        ...item,
        value: item.value, // 将 Big.js 对象转换回普通数字
        percentage: percentage.toNumber(),
      };
    });
  };

  /**
   * @transformPanlData 过滤掉 level === 1 且 name 为 '-' 的项
   */
  const transformPanlData = (data: any[]) => {
    return data.reduce((prev, item) => {
      return item.name !== "-" ? [...prev, item] : prev;
    }, []);
  };

  /**
   * @runExportReport 导出报表
   */
  const runExportReport = useImmerApi(get_export, {
    onSuccess(value) {
      const { data } = value;
      exportDownload(data);
    },
  });
  /**
   * @runDeptTree 获取部门树
   */
  const runDeptTree = useImmerApi(deptTree, {
    onSuccess(value: any) {
      const { data } = value;
      setState((d) => {
        d.deptTree = data?.data ?? {};
      });
    },
  });

  /**
   * @runStatisticsData 获取仪表盘数据
   */
  const runStatisticsData = useImmerApi(get_panel_data, {
    onSuccess(res: any) {
      const data = res?.data.data as any;
      if (state.activeTag === "intentionProject") {
        logic.handleSetIntentionData(data);
      } else {
        logic.handleSetAreaData(data);
      }
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
   * @runGetChannelGroup 获取渠道分组数据
   */
  const runGetChannelGroup = useImmerApi(get_channel_group, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.channelGroup = data?.data?.records ?? [];
      });
    },
  });

  const logic = useMethods({
    /**
     * @handleSetIntentionData 设置意向统计数据
     */
    handleSetIntentionData(data: any[]) {
      let total = new Big(0);
      // 第一次遍历：计算总数
      data?.forEach((item: any) => {
        const { numberOfCustomers } = item;
        total = total.plus(new Big(numberOfCustomers)); // 更新 total
      });
      const pieValue = data?.map((item: any) => {
        const { numberOfCustomers, dataName } = item;
        // 在这里 total 还是0
        const r = new Big(numberOfCustomers).div(total);
        const _r = r.mul(new Big(100)).toNumber().toFixed(2).toString();
        return {
          dataName,
          numberOfCustomers,
          rate: _r,
        };
      });
      setState((d) => {
        d.panelData = pieValue ?? [];
        d.tableDataSource = data ?? [];
      });
    },
    /**
     * @handleSetAreaData 设置地区比例数据
     */
    handleSetAreaData(data: any[]) {
      let pieValue: any = {
        root: [],
      };
      // const newData = transformPanlData(data);
      const newData = data;
      newData?.map((item: any) => {
        const { level, children, name, strategicFlag, value, areaCode } = item;
        if (level === 1) {
          pieValue.root.push({
            name,
            value,
            areaCode,
            level,
            strategicFlag,
          });
        }
        if (children) {
          pieValue[areaCode] = children;
        }
      });
      // 计算根层的占比
      pieValue.root = calculatePercentage(pieValue.root);
      let importantList: any[] = [];
      let importantTotal = 0;
      let importantTotalPercentage = 0;
      pieValue.root?.map((item: any) => {
        if (item.strategicFlag) {
          importantList.push(item);
          importantTotal += Number(item.value);
          importantTotalPercentage += item.percentage;
        }
      });
      importantList = importantList.sort((a, b) => b.value - a.value);
      setState((d) => {
        d.panelData = pieValue.root;
        d.tableDataSource = newData || [];
        d.importantList = importantList ?? [];
        d.importantTotal = importantTotal;
        d.importantTotalPercentage = importantTotalPercentage;
      });
    },
    /**
     * @exportReport 导出报表
     */
    exportReport(code: ReportCode) {
      const values = form.getFieldsValue();

      if (
        code === "B0002" &&
        !values.channelIds?.length &&
        !values.channelGroupIds?.length
      ) {
        message.warning("请选择渠道或者渠道分组");
        return;
      }

      const data: { [key: string]: any } = {
        // 根据code来判断time解析方式
        ...(code !== "A0003" &&
          code !== "A0004" &&
          code !== "B0001" &&
          code !== "B0002" &&
          code !== "B0003" &&
          code !== "INDIVIDUAL_RETENTION_RATE" && {
            ...this.handleRangeTime(values.time),
          }),
        ...(code === "A0003" && {
          ...this.handleWeekTime(values.time),
        }),
        ...(code === "A0004" && {
          ...this.handleMonthTime(values.time),
        }),
        ...(code === "B0001" && {
          ...this.handleDayTime(values.time),
        }),

        // 根据code来判断是否需要shiftType
        ...(code === "B0001" ? { shiftType: values.shiftType } : {}),

        // 根据code来判断是否需要deptId和deptName
        ...(code === "C0002"
          ? {
              deptId: values.dept?.value,
              deptName: values.dept?.label,
            }
          : {}),
        ...(code === "C0010"
          ? {
              channelTypeId: values.channelTypeId,
            }
          : {}),
        // 根据code来判断是否需要channelIds
        ...(code === "B0002"
          ? {
              channelIds: values.channelIds,
            }
          : {}),
        // 根据code来判断是否需要channelGroupIds
        ...(code === "B0002" || code === "B0003"
          ? {
              channelGroupIds: values.channelGroupIds,
              startLocalDateTime: values.time[0]?.format("YYYY-MM-DD HH:mm:ss"),
              endLocalDateTime: values.time[1]?.format("YYYY-MM-DD HH:mm:ss"),
            }
          : {}),
        ...(code === "INDIVIDUAL_RETENTION_RATE"
          ? {
              deptIds: values.deptIds,
              startLocalDateTime: values.time[0]?.format("YYYY-MM-DD HH:mm:ss"),
              endLocalDateTime: values.time[1]?.format("YYYY-MM-DD HH:mm:ss"),
            }
          : {}),
      };
      runExportReport.run({ code, data });
    },
    /**
     * @getDeptTree 获取部门树
     */
    getDeptTree() {
      runDeptTree.run();
    },
    /**
     * @resetForm 重置条件搜索
     */
    resetForm() {
      form.resetFields();
    },
    /**
     * @handleRangeTime 构造 时间段 请求参数
     */
    handleRangeTime(time: any) {
      return {
        startLocalDateTime: time[0]
          ?.startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: time[1]?.endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    /**
     * @handleDayTime 构造 天 请求参数
     */
    handleDayTime(time: any) {
      return {
        startLocalDateTime: time?.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: time?.endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    /**
     * @handleXhsPutFormDayTime 构造 小红书投放监测表 天 参数
     */
    handleXhsPutFormDayTime(time: any, shiftType: number) {
      const startOfDay = dayjs(time).startOf("day"); // 获取当天 00:00:00
      const nextDay = dayjs(time).add(1, "day"); // 第二天 00:00:00
      return shiftType === 0
        ? {
            // 白班
            startLocalDateTime: startOfDay
              .hour(1)
              .minute(0)
              .second(0)
              .format("YYYY-MM-DD HH:mm:ss"), // 设置为 01:00:00
            endLocalDateTime: startOfDay
              .hour(16)
              .minute(59)
              .second(59)
              .format("YYYY-MM-DD HH:mm:ss"), // 设置为 16:59:59
          }
        : shiftType === 1
          ? {
              // 夜班
              startLocalDateTime: startOfDay
                .hour(17)
                .minute(0)
                .second(0)
                .format("YYYY-MM-DD HH:mm:ss"), // 设置为 17:00:00
              endLocalDateTime: nextDay
                .hour(0)
                .minute(59)
                .second(59)
                .format("YYYY-MM-DD HH:mm:ss"), // 设置为 00:59:59
            }
          : {
              // 全天
              startLocalDateTime: startOfDay.format("YYYY-MM-DD 01:00:00"),
              endLocalDateTime: nextDay.format("YYYY-MM-DD 00:59:59"),
            };
    },
    /**
     * @handleWeekTime 构造 周 请求参数
     */
    handleWeekTime(time: any) {
      return {
        startLocalDateTime: time
          ?.startOf("week")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: time
          ?.endOf("week")
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    /**
     * @handleMonthTime 构造 月 请求参数
     */
    handleMonthTime(time: any) {
      return {
        startLocalDateTime: time
          ?.startOf("month")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: time
          ?.endOf("month")
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    /**
     * @getStatisticsData 获取仪表盘数据
     */
    getStatisticsData(code: string) {
      const value = form.getFieldsValue();
      const request = value.time
        ? {
            startLocalDateTime: dayjs(value.time[0])
              .startOf("day")
              .format("YYYY-MM-DD HH:mm:ss"),
            endLocalDateTime: dayjs(value.time[1])
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss"),
          }
        : {};
      runStatisticsData.run({
        request,
        code,
      });
    },
    /**
     * @handleGenearePieOptions 生成意向项目/地区比列 饼图 option
     */
    handleGenearePieOptions() {},
    /**
     * @setActiveTag 设置 tab keys
     */
    setActiveTag(key: string) {
      setState((d) => {
        d.activeTag = key;
        d.isStatistics = key === "intentionProject" || key === "areaProportion";
      });
    },
    /**
     * @getChannelType 获取渠道分类树
     */
    getChannelType() {
      runGetChannelTypeTree.run();
    },
    /**
     *
     */
    getChannelGroup(groupName?: string) {
      runGetChannelGroup.run({ page: 1, size: 100, groupName });
    },
  });
  /**
   * @form 条件搜索表单 form
   */
  const form = Form.useForm()[0];
  /**
   * @formValues 条件搜索表单 form values
   */
  const formValues = Form.useWatch((values) => values, form);

  return {
    state,
    logic,
    form,
    formValues,
    api: {
      runDeptTree,
      runExportReport,
      runStatisticsData,
      runGetChannelTypeTree,
      runGetChannelGroup,
    },
  };
}

export const { useSelector, Provider } = createStore(ReportFormsStore);
