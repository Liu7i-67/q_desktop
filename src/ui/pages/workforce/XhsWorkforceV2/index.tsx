import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import React, { Suspense } from "react";
import { Tabs } from "antd";
import { TXhsWorkforceTab } from "./interface";

const Schedule = React.lazy(() => import("./Schedule"));
const Shift = React.lazy(() => import("./Shift"));

const XhsWorkforceV2 = observer(function XhsWorkforceV2_() {
  const root = useStore();
  const { logic } = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    }
  );

  return (
    <>
      <Tabs
        className="px-4"
        items={logic.items}
        activeKey={logic.activeKey}
        onChange={(key) => logic.changeActiveKey(key as TXhsWorkforceTab)}
      />
      <Suspense fallback="页面加载中...">
        {logic.renderSet.has("schedule") && (
          <Schedule visible={logic.activeKey === "schedule"} />
        )}
        {logic.renderSet.has("shift") && (
          <Shift visible={logic.activeKey === "shift"} />
        )}
      </Suspense>
    </>
  );
});

export default observer(function XhsWorkforceV2Page() {
  return (
    <Provider>
      <XhsWorkforceV2 />
    </Provider>
  );
});
