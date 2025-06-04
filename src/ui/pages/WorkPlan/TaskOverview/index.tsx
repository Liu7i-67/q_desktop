import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import TXNoPermission from "@/components/TXNoPermission";
import { Tabs } from "antd";
const TaskList = lazy(() => import("./TaskList"));
const TaskCalendar = lazy(() => import("./TaskCalendar"));
import { lazy, Suspense } from "react";

const TaskOverview = observer(function TaskOverview_() {
  const root = useStore();
  const { logic } = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    }
  );

  if (!logic.items.length) return <TXNoPermission />;

  return (
    <>
      <Tabs
        className="px-4"
        activeKey={logic.activeKey}
        items={logic.items}
        size="small"
        onChange={logic.onChange}
      />
      <Suspense fallback="加载中...">
        {logic.renderSet.has("taskList") && (
          <TaskList visible={logic.activeKey === "taskList"} />
        )}
        {logic.renderSet.has("taskCalendar") && (
          <TaskCalendar visible={logic.activeKey === "taskCalendar"} />
        )}
      </Suspense>
    </>
  );
});

export default observer(function TaskOverviewPage() {
  return (
    <Provider>
      <TaskOverview />
    </Provider>
  );
});
