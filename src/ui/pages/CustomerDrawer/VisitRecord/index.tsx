import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IVisitRecordProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import { cn } from "@/utils/tools";
import { OptionRow } from "./modules/OptionRow";
import EditVisitRecordModal from "../EditVisitRecordModal";

const VisitRecord = observer(function VisitRecord_(props: IVisitRecordProps) {
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
      <EditVisitRecordModal ref={refs.editRef} onSuccess={logic.getList} />
    </div>
  );
});

export default observer(function VisitRecordPage(props: IVisitRecordProps) {
  return (
    <Provider>
      <VisitRecord {...props} />
    </Provider>
  );
});

export * from "./interface";
