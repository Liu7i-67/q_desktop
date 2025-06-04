import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import type { ITodayTaskProps, TTodayTask } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { Tabs } from "antd";
import React, { Suspense } from "react";

const Deadline = React.lazy(() => import("./Deadline"));
const Total = React.lazy(() => import("./Total"));

const TodayTask = observer(function TodayTask_(props: ITodayTaskProps) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useWhen(
    () => true,
    () => logic.init()
  );

  return (
    <>
      <Tabs
        className="px-4"
        items={logic.items}
        activeKey={logic.activeKey}
        onChange={(key) => logic.changeActiveKey(key as TTodayTask)}
      />
      <Suspense fallback="页面加载中...">
        {logic.renderSet.has("deadline") && (
          <Deadline
            visible={logic.activeKey === "deadline"}
            changeTab={() => logic.changeActiveKey("total")}
          />
        )}
        {logic.renderSet.has("total") && (
          <Total visible={logic.activeKey === "total"} />
        )}
      </Suspense>
    </>
  );
});

export default observer(function TodayTaskPage(props: ITodayTaskProps) {
  return (
    <Provider>
      <TodayTask {...props} />
    </Provider>
  );
});

export * from "./interface";
