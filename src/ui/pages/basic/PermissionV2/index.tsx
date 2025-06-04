import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IPermissionV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import Sidebar from "./Sidebar";

const PermissionV2 = observer(function PermissionV2_(
  props: IPermissionV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div className="flex">
      <div className="min-w-[320px]">
        <Sidebar onCheck={logic.onCheck} />
      </div>
      <div className="p-2 flex-1">
        <SearchHeader />
        <TableList />
      </div>
    </div>
  );
});

export default observer(function PermissionV2Page(props: IPermissionV2Props) {
  return (
    <Provider>
      <PermissionV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
