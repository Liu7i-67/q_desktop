import TXNoPermission from "@/components/TXNoPermission";
import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import { ConfigProvider } from "antd";
import type { ITaskStrategyProps } from "./interface";
import TaskTabbsPage from "./modules/TaskTabbsPage";
import { Provider, useStore } from "./store/RootStore";

const TaskStrategy = observer(function TaskStrategy_(
  props: ITaskStrategyProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    }
  );

  if (!logic.items.length) return <TXNoPermission />;

  return (
    <TaskTabbsPage
      manageStartgyEditId={logic.manageStartgyEditId}
      strategyVisible={logic.strategyVisible}
      onStrategyVisibleChange={logic.onStrategyVisibleChange}
      onSetManageStartgyEditId={logic.onSetManageStartgyEditId}
    />
  );
});

export default observer(function TaskStrategyPage(props: ITaskStrategyProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {},
        },
      }}
    >
      <Provider>
        <TaskStrategy {...props} />
      </Provider>
    </ConfigProvider>
  );
});

export * from "./interface";
