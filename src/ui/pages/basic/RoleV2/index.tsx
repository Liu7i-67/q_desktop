import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IRoleV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import EditModal from "./modules/EditModal";

const RoleV2 = observer(function RoleV2_(props: IRoleV2Props) {
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

export default observer(function RoleV2Page(props: IRoleV2Props) {
  return (
    <Provider>
      <RoleV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
