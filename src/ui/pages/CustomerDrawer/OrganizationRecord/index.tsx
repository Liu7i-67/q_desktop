import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IOrganizationRecordProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import { cn } from "@/utils/tools";
import { OptionRow } from "./modules/OptionRow";
import EditOrganizationRecordModal from "../EditOrganizationRecordModal";

const OrganizationRecord = observer(function OrganizationRecord_(
  props: IOrganizationRecordProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  const { show, detail } = props;

  useEffect(() => {
    if (show && detail?.id) {
      logic.getList();
    }
  }, [show, detail]);

  return (
    <div className={cn("p-2", show ? "" : "hidden")}>
      <OptionRow />
      <TableList />
      <EditOrganizationRecordModal
        ref={refs.editRef}
        onSuccess={logic.getList}
      />
    </div>
  );
});

export default observer(function OrganizationRecordPage(
  props: IOrganizationRecordProps
) {
  return (
    <Provider>
      <OrganizationRecord {...props} />
    </Provider>
  );
});

export * from "./interface";
