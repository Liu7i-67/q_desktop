import dayjs from "dayjs";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

const CalendarCell = observer(({ date }: { date: dayjs.Dayjs }) => {
  const root = useStore();
  const { logic } = root;
  const daySchedule = logic.scheduleData?.find((item) =>
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
      {daySchedule?.userNameList?.map((name, index) => (
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
});

export default CalendarCell;
