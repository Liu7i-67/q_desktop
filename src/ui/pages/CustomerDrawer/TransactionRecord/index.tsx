import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { ITransactionRecordProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import { cn } from "@/utils/tools";
import { OptionRow } from "./modules/OptionRow";
import EditDealModal from "../EditDealModal";
import TransactionRecordDetailModal from "../TransactionRecordDetailModal";

const TransactionRecord = observer(function TransactionRecord_(
  props: ITransactionRecordProps
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
      <EditDealModal ref={refs.dealRef} onSuccess={logic.getList} />
      <TransactionRecordDetailModal ref={refs.detailRef} />
    </div>
  );
});

export default observer(function TransactionRecordPage(
  props: ITransactionRecordProps
) {
  return (
    <Provider>
      <TransactionRecord {...props} />
    </Provider>
  );
});

export * from "./interface";
