import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IConsultOrderProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { ActionRow } from "./modules/ActionRow";

const ConsultOrder = observer(function ConsultOrder_(
  props: IConsultOrderProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div>
      <SearchHeader />
      <ActionRow />
      <TableList />
    </div>
  );
});

export default observer(function ConsultOrderPage(props: IConsultOrderProps) {
  return (
    <Provider>
      <ConsultOrder {...props} />
    </Provider>
  );
});

export * from "./interface";
