import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { ITotalProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import TopStatistics from "./modules/TopStatistics";
import { cn } from "@/utils/tools";
import StatisticsToggle from "../modules/StatisticsToggle";
import CustomerDrawer from "@/pages/CustomerDrawer";

const Total = observer(function Total_(props: ITotalProps) {
  const { visible } = props;
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    if (visible) {
      logic.getList();
      logic.getStatistics();
    }
  }, [visible]);

  return (
    <div className={cn("", visible ? "" : "hidden", "relative")}>
      <StatisticsToggle
        className="absolute top-[-66px] right-0"
        visible={logic.showStatistics}
        onToggle={logic.toggleStatistics}
      />
      <TopStatistics />
      <TableList />
      <CustomerDrawer
        ref={refs.customerDrawerRef}
        afterClose={() => {
          logic.getList();
          logic.getStatistics();
        }}
      />
    </div>
  );
});

export default observer(function TotalPage(props: ITotalProps) {
  return (
    <Provider>
      <Total {...props} />
    </Provider>
  );
});

export * from "./interface";
