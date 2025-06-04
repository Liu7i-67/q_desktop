import { useEffect } from "react";
import { useSelector } from "./store";
import { Calendar as AntCalendar } from "antd";
import dayjs from "dayjs";

const Calendar = () => {
  const { scheduleData } = useSelector((x) => x.state);
  const drawerRef = useSelector((x) => x.drawerRef);
  const {
    getMonthData,
    setDrawerVisible,
    getWeekData,
    setCurrentWeek,
    setCurrentMonth,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    getMonthData(dayjs().format("YYYY-MM"));
  }, []);

  const cellRender = (date: any) => {
    const daySchedule = scheduleData.find((item: any) =>
      dayjs(item.scheduleDate).isSame(date, "day")
    );

    if (!daySchedule?.userNameList?.length) return null;

    return (
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "12px",
        }}
      >
        {daySchedule.userNameList.map((name: any, index: any) => (
          <li
            key={index}
            style={{
              color: "#434343",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (date: any, { source }: { source: any }) => {
    if (source === "date") {
      const weekStart = dayjs(date).startOf("week");
      let weekDates;
      weekDates = Array.from({ length: 7 }, (_, i) =>
        weekStart.add(i, "day").format("YYYY-MM-DD")
      );
      drawerRef.current?.openDrawer({
        date,
      });
      // // 设置当前周
      // setCurrentWeek(weekDates);
      // // 打开抽屉
      // setDrawerVisible(true);
      // // 获取当前周的排班情况
      // getWeekData(weekDates[0], weekDates[6]);
    }
  };

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col">
      <AntCalendar
        className={"px-4"}
        mode="month"
        style={{ flex: 1, overflow: "auto" }}
        fullscreen={true}
        cellRender={cellRender}
        onSelect={onSelect}
        onPanelChange={(date: any) => {
          getMonthData(dayjs(date).format("YYYY-MM"));
          setCurrentMonth(dayjs(date).format("YYYY-MM"));
        }}
      />
    </div>
  );
};

export default Calendar;
