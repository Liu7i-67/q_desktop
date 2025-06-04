import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IListOfConsultantsProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { classNames } from "@/utils/tools";
import { TableListByDate } from "./modules/TableListByDate";

const ListOfConsultants = observer(function ListOfConsultants_(
  props: IListOfConsultantsProps
) {
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

export default observer(function ListOfConsultantsPage(
  props: IListOfConsultantsProps
) {
  return (
    <Provider>
      <ListOfConsultants {...props} />
    </Provider>
  );
});

export * from "./interface";
