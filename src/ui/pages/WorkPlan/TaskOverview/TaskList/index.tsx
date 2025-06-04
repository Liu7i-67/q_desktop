import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { ITaskListProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { classNames } from "@/utils/tools";
import CustomerDrawer from "@/pages/CustomerDrawer";

const TaskList = observer(function TaskList_(props: ITaskListProps) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.init();
  }, []);

  return (
    <div
      className={classNames({
        hidden: !props.visible,
      })}
    >
      <SearchHeader />
      <TableList />
      <CustomerDrawer ref={refs.customerRef} />
    </div>
  );
});

export default observer(function TaskListPage(props: ITaskListProps) {
  return (
    <Provider>
      <TaskList {...props} />
    </Provider>
  );
});

export * from "./interface";
