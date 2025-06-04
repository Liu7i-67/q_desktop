import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { ITaskCalendarProps } from "./interface";
import { classNames } from "@/utils/tools";
import { Calendar, Spin } from "antd";
import { HeaderRender } from "./modules/HeaderRender";
import "./index.css";
import { CellRender } from "./modules/CellRender";
import { useEffect } from "react";
import { TaskOwnerRow } from "./modules/TaskOwnerRow";

const TaskCalendar = observer(function TaskCalendar_(
  props: ITaskCalendarProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, computed } = root;

  useEffect(() => {
    logic.getCalendarData();
  }, []);

  return (
    <div
      className={classNames({
        hidden: !props.visible,
      })}
    >
      <Spin spinning={computed.loading}>
        <TaskOwnerRow />
        <Calendar
          headerRender={(p) => {
            return <HeaderRender {...p} />;
          }}
          className="task-calendar"
          fullCellRender={(c) => <CellRender current={c}></CellRender>}
          onPanelChange={logic.onPanelChange}
        />
      </Spin>
    </div>
  );
});

export default observer(function TaskCalendarPage(props: ITaskCalendarProps) {
  return (
    <Provider>
      <TaskCalendar {...props} />
    </Provider>
  );
});
