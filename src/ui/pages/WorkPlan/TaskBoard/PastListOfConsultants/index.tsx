import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IPastListOfConsultantsProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { classNames } from "@/utils/tools";
import { TableListByDate } from "./modules/TableListByDate";

const PastListOfConsultants = observer(function PastListOfConsultants_(
  props: IPastListOfConsultantsProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    logic.init();
  }, [props.taskId, props.endDate]);

  return (
    <div
      className={classNames({
        hidden: !props.visible,
      })}
    >
      <SearchHeader />
      <TableList />
      <TableListByDate />
    </div>
  );
});

export default observer(function PastListOfConsultantsPage(
  props: IPastListOfConsultantsProps
) {
  return (
    <Provider>
      <PastListOfConsultants {...props} />
    </Provider>
  );
});

export * from "./interface";
