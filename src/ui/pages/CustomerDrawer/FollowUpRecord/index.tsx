import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IFollowUpRecordProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import { cn } from "@/utils/tools";
import FollowUpModal from "@/pages/Workbench/FollowUpModal";
import { OptionRow } from "./modules/OptionRow";

const FollowUpRecord = observer(function FollowUpRecord_(
  props: IFollowUpRecordProps
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
      <FollowUpModal ref={refs.followUpRef} onSuccess={logic.getList} />
    </div>
  );
});

export default observer(function FollowUpRecordPage(
  props: IFollowUpRecordProps
) {
  return (
    <Provider>
      <FollowUpRecord {...props} />
    </Provider>
  );
});

export * from "./interface";
