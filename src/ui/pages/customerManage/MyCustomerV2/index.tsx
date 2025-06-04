import TXPeekModal from "@/components/TXPeekModal";
import CollaborationModal from "@/pages/CollaborationModal";
import CustomerDrawer from "@/pages/CustomerDrawer";
import EditDispatchRecordModal from "@/pages/CustomerDrawer/EditDispatchRecordModal";
import { observer } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import type { IMyCustomerV2Props } from "./interface";
import EditModal from "./modules/EditModal";
import MergeCustomerModal from "./modules/MergeCustomerModal";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import TransferCustomerModal from "./modules/TransferCustomerModal";
import { Provider, useStore } from "./store/RootStore";

const MyCustomerV2 = observer(function MyCustomerV2_(
  props: IMyCustomerV2Props
) {
  const root = useStore();
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
    logic.getRegionTree();
    logic.getFirstConsultTree();
  }, []);

  return (
    <div>
      <SearchHeader />
      <TableList />
      {/* 新增/编辑弹窗 */}
      <EditModal ref={refs.editRef} afterClose={logic.getList} />
      {/* 转移客户弹窗 */}
      <TransferCustomerModal
        ref={refs.transferRef}
        afterClose={() => logic.afterCloseTransferModal()}
      />
      {/* 查重结果弹窗 */}
      {/* <RepeatModal ref={refs.repeatRef} afterClose={logic.getList} /> */}
      {/* 合并弹窗 */}
      <MergeCustomerModal
        ref={refs.mergeCustomerModalRef}
        afterClose={logic.getList}
      />
      {/* 详情弹窗 */}
      <CustomerDrawer ref={refs.customerDrawerRef} afterClose={logic.getList} />
      {/* 派单弹窗 */}
      <EditDispatchRecordModal
        ref={refs.editDispatchRecordRef}
        onSuccess={logic.getList}
      />
      {/* 协作弹窗 */}
      <CollaborationModal ref={refs.collRef} onSuccess={logic.getList} />
      {/* 查重弹窗 */}
      <TXPeekModal ref={refs.TXPeekModalRef} afterClose={logic.getList} />
    </div>
  );
});

export default observer(function MyCustomerV2Page(props: IMyCustomerV2Props) {
  return (
    <Provider>
      <MyCustomerV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
