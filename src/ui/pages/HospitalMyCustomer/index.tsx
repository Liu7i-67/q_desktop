import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IHospitalMyCustomerProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import EditOrderStatusModal from "../CustomerDrawer/EditOrderStatusModal";
import InstitutionalFeedbackDrawer from "../CustomerDrawer/InstitutionalFeedbackDrawer";
import OrderDispatchMessageDrawer from "../CustomerDrawer/OrderDispatchMessageModal/Drawer";

const HospitalMyCustomer = observer(function HospitalMyCustomer_(
  props: IHospitalMyCustomerProps
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
      <TableList />
      <EditOrderStatusModal ref={refs.dispatchRef} onRefresh={logic.getList} />
      <InstitutionalFeedbackDrawer ref={refs.feedbackRef} />
      <OrderDispatchMessageDrawer ref={refs.msgRef} />
    </div>
  );
});

export default observer(function HospitalMyCustomerPage(
  props: IHospitalMyCustomerProps
) {
  return (
    <Provider>
      <HospitalMyCustomer {...props} />
    </Provider>
  );
});

export * from "./interface";
