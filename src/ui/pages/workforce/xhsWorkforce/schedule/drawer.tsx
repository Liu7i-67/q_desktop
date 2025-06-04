import { Button, Popconfirm, Select, Spin, Tag, Tooltip } from "antd";
import { Drawer as AntDrawer } from "@/components/TXDrawer";
import { useSelector } from "./store";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { system2timeQuantum } from "@/utils/tools";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";
import { SchedulePicker } from "./SchedulePicker";

interface DataType {
  key: string;
  name: string;
  [key: string]: string; // 动态日期列
}

const Drawer = () => {
  const {
    drawerVisible,
    currentWeek,
    weekData,
    employeeList,
    employeeCurrent,
    employeeTotal,
    shiftList,
  } = useSelector((x) => x.state);
  const {
    setDrawerVisible,
    setEmployeeList,
    setEmployeeCurrent,
    handleEmployeeSearch,
    onEmployeeScroll,
    updateWeekData,
    getShiftData,
    getChannelGroup,
    saveWeekData,
    setWeekData,
  } = useSelector((x) => x.logic);
  const { runGetEmployee, runGetWeekData, runUpdateUserSchedule } = useSelector(
    (x) => x.api
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // 在组件顶部添加数据处理
  const uniqueWeekData = useMemo(() => {
    // 使用 Map 按用户名分组，保留最新的记录
    const userMap = new Map();

    weekData.forEach((record: any) => {
      const key = record.userName;
      if (!userMap.has(key)) {
        userMap.set(key, { ...record });
      }
    });

    return Array.from(userMap.values());
  }, [weekData]);

  // 搜索员工
  const debouncedSearch = (value: string) => {
    setSearchValue(value);
    setEmployeeList([]);
    setEmployeeCurrent(1);

    if (timer) {
      clearTimeout(timer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleEmployeeSearch(value);
    }, 500);
    setTimer(newTimer);
  };

  // 滚动事件
  const onPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetEmployee.loading &&
      employeeTotal > employeeList.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      onEmployeeScroll(searchValue, employeeCurrent + 1);
    }
  };

  useEffect(() => {
    if (drawerVisible) {
      getShiftData();
      getChannelGroup("");
    } else {
      setWeekData([]);
    }
  }, [drawerVisible]);

  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <Select
          showSearch
          placeholder="请输入搜索关键词"
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={debouncedSearch}
          onClear={() => {
            setEmployeeList([]);
            setEmployeeCurrent(1);
          }}
          notFoundContent={
            runGetEmployee.loading ? (
              <Spin size="small" />
            ) : (
              <div
                style={{ textAlign: "center", color: "#999", padding: "8px 0" }}
              >
                {searchValue ? "暂无数据" : "请输入关键词"}
              </div>
            )
          }
          onDropdownVisibleChange={(open) => {
            if (open) {
              setEmployeeCurrent(1);
              setEmployeeList([]);
            }
          }}
          onPopupScroll={onPopupScroll}
          style={{ width: "100%" }}
          value={record.userName}
          onChange={(value) => {
            const selectedEmployee = employeeList.find(
              (emp: any) => emp.id === value
            );
            if (selectedEmployee) {
              // 获取该用户所有的班次记录
              const userSchedules = weekData.filter(
                (item: any) => item.userName === record.userName
              );

              // 更新每个日期的记录
              userSchedules.forEach((schedule: any) => {
                const newData = {
                  ...schedule,
                  userName: selectedEmployee.userName,
                  userId: selectedEmployee.id,
                  scheduleDate: schedule.scheduleDate,
                  workingShiftDTOList: schedule.workingShiftDTOList || [],
                };
                updateWeekData(record.userName, newData);
              });
            }
          }}
          bordered={false}
          showArrow={false}
        >
          {employeeList.map((employee: any) => (
            <Select.Option key={employee.id} value={employee.id}>
              {employee.userName}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    ...currentWeek.map((date: any, index: number) => ({
      title: () => {
        const weekDays = [
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
          "周日",
        ];
        const dayIndex = dayjs(date).day() === 0 ? 6 : dayjs(date).day() - 1;
        return `${dayjs(date).format("MM/DD")} ${weekDays[dayIndex]}`;
      },
      dataIndex: date,
      key: date,
      width: 120,
      render: (_: any, record: any) => {
        // 获取当前日期的班次列表
        const daySchedule = weekData.find(
          (item: any) =>
            item.userName === record.userName && item.scheduleDate === date
        );

        // 只获取当前日期的班次
        const dayShifts = daySchedule?.workingShiftDTOList || [];
        // 选中的渠道
        const webChannelIdList = daySchedule?.webChannelIdList || [];

        return (
          <SchedulePicker
            index={index}
            dayShifts={dayShifts}
            webChannelIdList={webChannelIdList}
            record={record}
            date={date}
          />
        );
      },
    })),
    {
      title: "操作",
      key: "action",
      width: 80,
      fixed: "right",
      render: (_, record) =>
        RedBookSchedulingAuth.redBookSchedulingUpdate ? (
          <Popconfirm
            title="确认删除"
            description="是否确认删除该行数据？"
            onConfirm={() => {
              updateWeekData(record.userName, {
                ...record,
                _delete: true,
              });
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        ) : (
          <></>
        ),
    },
  ];

  return (
    <AntDrawer
      open={drawerVisible}
      onClose={() => setDrawerVisible(false)}
      title="日程安排"
      width={1200}
      extra={
        RedBookSchedulingAuth.redBookSchedulingUpdate ? (
          <Button
            type="primary"
            onClick={() => saveWeekData()}
            loading={runUpdateUserSchedule.loading}
          >
            保存
          </Button>
        ) : (
          <></>
        )
      }
    >
      <Table
        columns={columns}
        dataSource={uniqueWeekData}
        scroll={{ x: "max-content", y: "calc(100vh - 250px)" }}
        pagination={false}
        size="small"
        bordered
        rowKey="userName"
        loading={runGetWeekData.loading}
        footer={() => (
          <Button
            disabled={!RedBookSchedulingAuth.redBookSchedulingUpdate}
            type="dashed"
            onClick={() => {
              // 创建新行数据
              const newRecord = {
                userName: null, // 使用临时用户名
                userId: null,
                scheduleDate: currentWeek[0], // 使用第一天作为默认日期
                workingShiftDTOList: [],
                key: Date.now().toString(),
              };

              // 使用 updateWeekData 更新数据
              updateWeekData(newRecord.userName, newRecord);
            }}
            block
          >
            新增行
          </Button>
        )}
      />
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h4 className="m-0 text-gray-500">班次说明：</h4>
          <div className="flex flex-1 gap-2 flex-wrap cursor-pointer">
            {shiftList.map((shift: any) => (
              <Tag key={shift.id} color="blue" bordered={false}>
                <Tooltip
                  title={
                    system2timeQuantum(shift.timeSlot)[0] +
                    "-" +
                    system2timeQuantum(shift.timeSlot)[1]
                  }
                >
                  {shift.shiftName}
                </Tooltip>
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </AntDrawer>
  );
};

export default Drawer;
