import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IEmployeeBindV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import EditModal from "./modules/EditModal";

const EmployeeBindV2 = observer(function EmployeeBindV2_(
  props: IEmployeeBindV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div>
      <SearchHeader />
      <TableList />
      <EditModal ref={refs.editRef} afterClose={logic.getList} />
    </div>
  );
});

export default observer(function EmployeeBindV2Page(
  props: IEmployeeBindV2Props
) {
  return (
    <Provider>
      <EmployeeBindV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
