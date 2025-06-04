import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IAdvertisingPlanManagementProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { ActionRow } from "./modules/ActionRow";
import AdvertisingPlanManagementEditModal from "./AdvertisingPlanManagementEditModal";

const AdvertisingPlanManagement = observer(function AdvertisingPlanManagement_(
  props: IAdvertisingPlanManagementProps
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
      <ActionRow />
      <TableList />
      <AdvertisingPlanManagementEditModal
        ref={refs.editRef}
        afterClose={logic.getList}
      />
    </div>
  );
});

export default observer(function AdvertisingPlanManagementPage(
  props: IAdvertisingPlanManagementProps
) {
  return (
    <Provider>
      <AdvertisingPlanManagement {...props} />
    </Provider>
  );
});

export * from "./interface";
