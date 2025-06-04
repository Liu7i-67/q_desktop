import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IPlatformManageV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import EditModal from "./modules/EditModal";

const PlatformManageV2 = observer(function PlatformManageV2_(
  props: IPlatformManageV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <>
      <SearchHeader />
      <TableList />
      <EditModal ref={refs.editRef} afterClose={logic.getList} />
    </>
  );
});

export default observer(function PlatformManageV2Page(
  props: IPlatformManageV2Props
) {
  return (
    <Provider>
      <PlatformManageV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
