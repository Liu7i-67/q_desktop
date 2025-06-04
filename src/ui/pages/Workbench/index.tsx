import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Tabs } from "antd";
import TXNoPermission from "@/components/TXNoPermission";
import FollowUpToday from "./FollowUpToday";

const Workbench = observer(function Workbench_() {
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
        onChange={logic.onChange}
      />
      {logic.renderSet.has("todoToday") && (
        <FollowUpToday visible={logic.activeKey === "todoToday"} />
      )}
    </>
  );
});

export default observer(function WorkbenchPage() {
  return (
    <Provider>
      <Workbench />
    </Provider>
  );
});
