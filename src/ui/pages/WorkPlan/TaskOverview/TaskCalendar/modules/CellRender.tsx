import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import dayjs, { Dayjs } from "dayjs";
import { classNames } from "@/utils/tools";
import { smailIcon, successIcon, dangerIcon, warrningIcon } from "./svgs";
import { Tooltip } from "antd";

export const CellRender = observer(function CellRender_(props: {
  current: Dayjs;
}) {
  const root = useStore();
  const { logic } = root;
  const { current } = props;

  const today = current.format("YYYY-MM-DD");

  let record = logic.dataMap.get(today);

  if (!record) {
    if (dayjs(today).isAfter()) {
      record = {
        ratio: -1,
        totalCount: "0",
        className: "",
        targetDay: today,
      };
    } else {
      record = {
        ratio: 0,
        totalCount: "0",
        className: "danger-cell",
        targetDay: today,
      };
    }
  }

  return (
    <div
      className={classNames({
        "task-calendar-cell": true,
        [record?.className || ""]: true,
      })}
      onClick={(e) => {
        e.stopPropagation();
        window.open(
          `${location.href.split("?")[0]}?date=${today}&&type=taskList&&taskOrg=${logic.taskOrg || ""}`
        );
      }}
    >
      <div
        className="task-calendar-cell-bg"
        style={{
          width: `${record?.ratio || 0}%`,
        }}
      ></div>
      <div className="h-full relative z-10 flex flex-col">
        <div className="flex-1">
          <div className="task-calendar-date">{current.format("DD")}</div>
        </div>
        <div className="flex">
          {successIcon}
          {smailIcon}
          {warrningIcon}
          {dangerIcon}
        </div>
        {typeof record?.ratio == "number" && record?.ratio > -1 && (
          <Tooltip title={`任务完成率：${record?.ratio}%`}>
            <div className="text-left wes">
              任务完成率：
              <span className="task-calendar-cell-ratio">{record?.ratio}</span>%
            </div>
          </Tooltip>
        )}
        {!!record && record?.ratio === -1 && (
          <Tooltip title={`截止任务量：${record?.totalCount || 0}`}>
            <div className="text-left text-[#999] wes">
              截止任务量：
              {record?.totalCount || 0}
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
});
