import { getPage } from "@/pages/basic/employee/service";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { message } from "antd";
import dayjs from "dayjs";
import { get_shift_page } from "../shift/service";
import { get_month_view, get_week_view, update_user_schedule } from "./service";
import { get_channel_group } from "@/pages/SchedulingManagement/service";
import {
  IChannelGrouping,
  ITreeChannelGrouping,
} from "@/pages/SchedulingManagement/ChannelGrouping";
import { IOption } from "@/utils/interface";
import { useRef } from "react";
import { IScheduleArrangementDrawerRef } from "@/pages/ScheduleArrangementDrawer/interface";

function ScheduleStore() {
  const drawerRef = useRef<IScheduleArrangementDrawerRef>(null);
  const [state, setState] = useImmer({
    /**
     * @scheduleData 排版管理数据
     */
    scheduleData: [] as any,
    /**
     * @weekData 周排班数据
     */
    weekData: [] as any,
    /**
     * @currentWeek 记录当前周（当前选中的日 所在的哪一周，周一到周天）
     */
    currentWeek: [] as any,
    /**
     * @employeeList 员工数据列表（日程安排弹窗，姓名下拉框搜索数据源）
     */
    employeeList: [] as any,
    /**
     * @employeeList 员工数据列表 total
     */
    employeeTotal: 0,
    /**
     * @employeeCurrent 员工数据列表 current
     */
    employeeCurrent: 1,
    /**
     * @employeePageSize 员工数据列表 PageSize
     */
    employeePageSize: 20,
    /**
     * @shiftList 班次数据列表（日程安排弹窗，班次下拉框搜索数据源）
     */
    shiftList: [] as any,
    /**
     * @shiftCurrent 班次数据列表 current
     */
    shiftCurrent: 1,
    /**
     * @shiftPageSize 班次数据列表 shiftPageSize
     */
    shiftPageSize: 50,
    /**
     * @drawerVisible 日程安排抽屉显示隐藏
     */
    drawerVisible: false,
    /**
     * @currentMonth 当前月份
     */
    currentMonth: dayjs().format("YYYY-MM"),
    /** @param 渠道分组树 */
    channelGroup: [] as ITreeChannelGrouping[],
  });

  /** @function 获取渠道分组信息 */
  const runGetChannelGroup = useImmerApi(get_channel_group, {
    onSuccess(value) {
      const { data } = value;
      const list: ITreeChannelGrouping[] = [];

      for (let g of data.data.records) {
        list.push({
          ...g,
          title: g.groupName,
          value: g.groupId,
          key: g.groupId,
          children: g.channelDTOList.map((c: IChannelGrouping) => {
            let key = `${c.channelId}_${g.groupId}`;

            return {
              ...c,
              title: c.channelName,
              value: key,
              key,
            };
          }),
        });
      }
      setState((o) => {
        o.channelGroup = list;
      });
    },
  });
  /**
   * @runGetMonthData 获取月排班情况
   */
  const runGetMonthData = useImmerApi(get_month_view, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.scheduleData = data?.data ?? [];
      });
    },
  });
  /**
   * @runGetWeekData 获取周排班情况
   */
  const runGetWeekData = useImmerApi(get_week_view, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.weekData = (data?.data ?? []).map((i: any) => {
          const webChannelIdList: IOption[] = [];

          for (let g of i.channelRelationDTOList || []) {
            for (let c of g.channelDTOList || []) {
              webChannelIdList.push({
                label: c.channelName,
                value: `${c.channelId}_${g.channelGroupId}`,
              });
            }
          }

          return {
            ...i,
            webChannelIdList,
          };
        });
      });
    },
  });
  /**
   * @runUpdateUserSchedule 修改排班
   */
  const runUpdateUserSchedule = useImmerApi(update_user_schedule, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        logic.getWeekData(state.currentWeek[0], state.currentWeek[6]);
        logic.getMonthData(state.currentMonth);
        message.success("修改成功");
      } else {
        message.error(data?.msg);
      }
    },
  });
  /**
   * @runGetEmployee 获取员工
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
   * @runGetShift 获取班次
   */
  const runGetShift = useImmerApi(get_shift_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.shiftList = data?.data ?? [];
      });
    },
  });

  const logic = useMethods({
    /**
     * @getMonthData 获取月排班数据
     */
    getMonthData(month: any) {
      runGetMonthData.run({
        scheduleDateStart: dayjs(month).startOf("month").format("YYYY-MM-DD"),
        scheduleDateEnd: dayjs(month).endOf("month").format("YYYY-MM-DD"),
        scheduleType: "LITTLE_RED_BOOK",
      });
    },
    /**
     * @getWeekData 获取周排班数据
     */
    getWeekData(scheduleDateStart: string, scheduleDateEnd: string) {
      runGetWeekData.run({
        scheduleDateStart,
        scheduleDateEnd,
        scheduleType: "LITTLE_RED_BOOK",
      });
    },
    /**
     * @getShiftData 获取班次数据
     */
    getShiftData() {
      runGetShift.run({
        size: state.shiftPageSize,
        page: state.shiftCurrent,
        scheduleType: "LITTLE_RED_BOOK",
      });
    },
    /**
     * @saveWeekData 修改排班
     */
    saveWeekData() {
      const list = state.weekData.map((item: any) => {
        if (item.workingShiftDTOList.length > 0) {
          const channelRelationPostDTOList: {
            channelGroupId: string;
            channelIdList: Set<string>;
          }[] = [];

          for (let c of (item.webChannelIdList || []) as IOption[]) {
            const [channelId, channelGroupId] = c.value.split("_");
            const item = channelRelationPostDTOList.find(
              (i) => i.channelGroupId === channelGroupId
            );
            if (item) {
              item.channelIdList.add(channelId);
            } else {
              channelRelationPostDTOList.push({
                channelGroupId,
                channelIdList: new Set([channelId]),
              });
            }
          }

          const shiftIdSet: Set<string> = new Set();

          for (let shift of item.workingShiftDTOList) {
            shiftIdSet.add(shift.id);
          }

          return {
            userId: item.userId,
            scheduleDate: item.scheduleDate,
            shiftIdList: [...shiftIdSet],
            channelRelationPostDTOList: channelRelationPostDTOList.map((i) => {
              return {
                ...i,
                channelIdList: [...i.channelIdList],
              };
            }),
          };
        }
      });

      // 移除空值
      const postDTOList = list.filter((item: any) => !!item);

      // 判断有没有排班
      if (postDTOList.length > 0) {
        const request = {
          scheduleDateEnd: state.currentWeek[6],
          scheduleDateStart: state.currentWeek[0],
          scheduleType: "LITTLE_RED_BOOK",
          postDTOList,
        };
        runUpdateUserSchedule.run(request);
      } else {
        message.warning("请填写排班信息");
      }
    },
    /**
     * @setDrawerVisible 显示隐藏排班抽屉
     */
    setDrawerVisible(visible: boolean) {
      setState((x) => {
        x.drawerVisible = visible;
      });
    },
    /**
     * @setCurrentWeek 设置当前周
     */
    setCurrentWeek(week: any) {
      setState((x) => {
        x.currentWeek = week;
      });
    },
    /**
     * @handleEmployeeSearch 员工下拉框查询
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
     * @setEmployeeCurrent 设置员工下拉框 current
     */
    setEmployeeCurrent(current: number) {
      setState((x) => {
        x.employeeCurrent = current;
      });
    },
    /**
     * @setEmployeeList 设置员工下拉框数据
     */
    setEmployeeList(list: any) {
      setState((x) => {
        x.employeeList = list;
      });
    },
    /**
     * @updateWeekData 日程安排 table 新增行逻辑回调
     */
    updateWeekData(oldUserName: any, newData: any) {
      setState((draft) => {
        // 如果有删除标记，删除该用户所有记录
        if (newData._delete) {
          draft.weekData = draft.weekData.filter(
            (item: any) => item.userName !== oldUserName
          );
          return;
        }

        // 查找当前日期的记录索引
        const existingRecordIndex = draft.weekData.findIndex(
          (item: any) =>
            item.userName === oldUserName &&
            item.scheduleDate === newData.scheduleDate
        );

        if (existingRecordIndex > -1) {
          // 更新现有记录
          draft.weekData[existingRecordIndex] = {
            ...draft.weekData[existingRecordIndex],
            ...newData,
            workingShiftDTOList: newData.workingShiftDTOList,
          };
        } else {
          // 如果记录不存在，添加新记录
          draft.weekData.push(newData);
        }

        // 确保每个用户每个日期只有一条记录
        draft.weekData = Array.from(
          new Map(
            draft.weekData.map((item: any) => [
              `${item.userName}-${item.scheduleDate}`,
              item,
            ])
          ).values()
        );
      });
    },
    /**
     * @setWeekData 设置周排班数据
     */
    setWeekData(data: any) {
      setState((x) => {
        x.weekData = data;
      });
    },
    /**
     * @setCurrentMonth 设置当前月
     */
    setCurrentMonth(month: string) {
      setState((x) => {
        x.currentMonth = month;
      });
    },
    /** @function 搜索渠道信息 */
    getChannelGroup(name: string) {
      runGetChannelGroup.run({
        page: 1,
        size: 1000,
        groupName: name || "",
      });
    },
  });
  return {
    state,
    logic,
    api: {
      runGetEmployee,
      runGetWeekData,
      runUpdateUserSchedule,
    },
    drawerRef,
  };
}

export const { useSelector, Provider } = createStore(ScheduleStore);
