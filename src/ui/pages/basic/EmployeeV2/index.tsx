import TXAuthContainer from "@/components/TXAuthContainer";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import { EmployeeAuth } from "./auth";
import type { IEmployeeV2Props } from "./interface";
import EditEmployeeModal from "./modules/EditEmployeeModal";
import RestPasswordInfoModal from "./modules/RestPasswordInfoModal";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const EmployeeV2 = observer(function EmployeeV2_(props: IEmployeeV2Props) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <TXAuthContainer auth={EmployeeAuth.userView}>
      <SearchHeader />
      <TableList />
      <EditEmployeeModal
        ref={refs.editEmployeeModalRef}
        afterClose={logic.getList}
      />
      <RestPasswordInfoModal ref={refs.resetPasswordInfoRef} />
    </TXAuthContainer>
  );
});

export default observer(function EmployeeV2Page(props: IEmployeeV2Props) {
  return (
    <Provider>
      <EmployeeV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
