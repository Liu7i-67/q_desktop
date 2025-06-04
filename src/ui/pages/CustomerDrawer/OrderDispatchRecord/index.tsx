import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { IOrderDispatchRecordProps } from "./interface";
import { cn } from "@/utils/tools";
import { useEffect } from "react";
import { TableList } from "./modules/TableList";
import { OptionRow } from "./modules/OptionRow";
import HistoricalDispatchingModal from "@/pages/HistoricalDispatchingModal";
import EditDispatchRecordModal from "../EditDispatchRecordModal";
import OrderDispatchMessageModal from "../OrderDispatchMessageModal";
import EditOrderStatusModal from "../EditOrderStatusModal";
import InstitutionalFeedbackDrawer from "../InstitutionalFeedbackDrawer";
import EditDealModal from "../EditDealModal";

const OrderDispatchRecord = observer(function OrderDispatchRecord_(
  props: IOrderDispatchRecordProps
) {
  const root = useStore();

  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;
  const { show, detail } = props;

  useEffect(() => {
    if (show && detail?.id) {
      logic.getCustomerDispatchPage();
    }
  }, [show, detail?.id]);

  useEffect(() => {
    if (!detail?.id) {
      logic.resetPageData();
    }
  }, [detail?.id]);

  return (
    <div className={cn("p-2", show ? "" : "hidden")}>
      <OptionRow />
      <TableList />
      <HistoricalDispatchingModal ref={refs.historyRecordRef} />
      <EditDispatchRecordModal
        ref={refs.editRef}
        onSuccess={logic.getCustomerDispatchPage}
      />
      <OrderDispatchMessageModal ref={refs.msgRef} />
      <EditOrderStatusModal
        ref={refs.statusRef}
        onRefresh={logic.getCustomerDispatchPage}
      />
      <InstitutionalFeedbackDrawer ref={refs.feedbackRef} />
      <EditDealModal
        ref={refs.dealRef}
        onSuccess={logic.getCustomerDispatchPage}
      />
    </div>
  );
});

export default observer(function OrderDispatchRecordPage(
  props: IOrderDispatchRecordProps
) {
  return (
    <Provider>
      <OrderDispatchRecord {...props} />
    </Provider>
  );
});
