import { cn } from "@/utils/tools";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import type { IExcuteStartegyProps } from "./interface";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const ExcuteStartegy = observer(function ExcuteStartegy_(
  props: IExcuteStartegyProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    if (props.visible) {
      logic.getList();
    }
  }, [props.visible]);

  return (
    <div className={cn("p-2", props.visible ? "" : "hidden")}>
      <TableList />
    </div>
  );
});

export default observer(function ExcuteStartegyPage(
  props: IExcuteStartegyProps
) {
  return (
    <Provider>
      <ExcuteStartegy {...props} />
    </Provider>
  );
});

export * from "./interface";
