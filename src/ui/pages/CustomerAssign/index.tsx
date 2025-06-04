import TXAuthContainer from "@/components/TXAuthContainer";
import TXPeekModal from "@/components/TXPeekModal";
import TransferModal from "@/pages/customerManage/MyCustomerV2/modules/TransferCustomerModal/assignTransfer";
import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { CustomerAssiginAuth } from "./auth";
import AddCustomerModal from "./modules/AddCustomerModal";
import AssignModal from "./modules/AssignModal";
import EditCustomerModal from "./modules/EditCustomerModal";
import { Option } from "./modules/Option";
import { Table } from "./modules/Table";
import { Provider, useStore } from "./store/RootStore";

const CustomerAssign = observer(function CustomerAssign_() {
  const root = useStore();
  const { logic, refs } = root;

  useWhen(
    () => true,
    () => {
      logic.getPageData();
      logic.getCityTree();
    }
  );

  return (
    <TXAuthContainer auth={CustomerAssiginAuth.customerAssignTaskView}>
      <Option />
      <Table />
      <AddCustomerModal
        ref={refs.addCustomerModalRef}
        afterClose={logic.getPageData}
      />
      <AssignModal ref={refs.assignModalRef} afterClose={logic.getPageData} />
      {/* <CustPeekModal ref={refs.custPeekModalRef} /> */}
      <TXPeekModal ref={refs.TXPeekModal} peekType="assigin" />
      {/* 转移弹窗 */}
      <TransferModal ref={refs.transferRef} afterClose={logic.getPageData} />
      {/* 编辑客户 */}
      <EditCustomerModal
        ref={refs.editCustomerModalRef}
        afterClose={logic.getPageData}
      />
    </TXAuthContainer>
  );
});

export default observer(function CustomerAssignPage() {
  return (
    <Provider>
      <CustomerAssign />
    </Provider>
  );
});
