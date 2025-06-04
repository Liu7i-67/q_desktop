import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import TXNoPermission from "@/components/TXNoPermission";
import { Tabs } from "antd";
import { lazy, Suspense } from "react";

const TodayData = lazy(() => import("./TodayData"));
const PastData = lazy(() => import("./PastData"));

const TaskBoard = observer(function TaskBoard_() {
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
    <div className="h-full">
      <Tabs
        className="px-4"
        activeKey={logic.activeKey}
        items={logic.items}
        size="small"
        onChange={logic.onChange}
      />
      <Suspense fallback="加载中...">
        {logic.renderSet.has("todayData") && (
          <TodayData visible={logic.activeKey === "todayData"} />
        )}
        {logic.renderSet.has("pastData") && (
          <PastData visible={logic.activeKey === "pastData"} />
        )}
      </Suspense>
    </div>
  );
});

export default observer(function TaskBoardPage() {
  return (
    <Provider>
      <TaskBoard />
    </Provider>
  );
});
