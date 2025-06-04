import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IListOfDptsProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { classNames } from "@/utils/tools";
import { TableListByDate } from "./modules/TableListByDate";

const ListOfDpts = observer(function ListOfDpts_(props: IListOfDptsProps) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    logic.init();
  }, [props.taskId]);

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

export default observer(function ListOfDptsPage(props: IListOfDptsProps) {
  return (
    <Provider>
      <ListOfDpts {...props} />
    </Provider>
  );
});

export * from "./interface";
