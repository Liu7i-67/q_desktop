import TransactionRecordDetailModal from "@/pages/CustomerDrawer/TransactionRecordDetailModal";
import TransactionEditRecordDetailModal from "@/pages/CustomerDrawer/TransactionRecordDetailModal/Edit";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import type { ITransactionManageV2Props } from "./interface";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const TransactionManageV2 = observer(function TransactionManageV2_(
  props: ITransactionManageV2Props
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
      <TransactionRecordDetailModal
        ref={refs.transactionRecordDetailModalRef}
      />
      <TransactionEditRecordDetailModal
        ref={refs.transactionEditRecordDetailModalRef}
        afterClose={logic.getList}
      />
    </>
  );
});

export default observer(function TransactionManageV2Page(
  props: ITransactionManageV2Props
) {
  return (
    <Provider>
      <TransactionManageV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
