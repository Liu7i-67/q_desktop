import TXAuthContainer from "@/components/TXAuthContainer";
import DetailDrawer from "@/components/customerDetailDrawer";
import { Provider as CProvider } from "@/pages/channel/employeeBind/store";
import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import AllTransferModal from "./modal/allTransferModal";
import CoordinateModal from "./modal/coordinateModal";
import EditModal from "./modal/editModal";
import MergeCustomerModal from "./modal/mergeCustomerModal";
import TranstionCustomerModal from "./modal/transtionCustomerModal";
import Option from "./option";
import { Provider, useSelector } from "./store";
import Table from "./table";
import CollaborationModal from "@/pages/CollaborationModal";
import CustomerDrawer from "@/pages/CustomerDrawer";

const MyCustomer = () => {
  const { detailDrawerVisible, sendOrderModalVisible } = useSelector(
    (x) => x.state
  );
  const collRef = useSelector((x) => x.collRef);
  const customerRef = useSelector((x) => x.customerRef);
  const {
    closeDetailDrawer,
    closeSendOrderModal,
    handleGetChangeAndSearchData,
  } = useSelector((x) => x.logic);

  return (
    <TXAuthContainer auth={MyCustomerAuth.customerView}>
      <>
        <Option />
        <Table />
        <EditModal />
        <CoordinateModal />
        <DetailDrawer
          detailDrawerVisible={detailDrawerVisible}
          closeDetailDrawer={closeDetailDrawer}
        />
        <MergeCustomerModal />
        <TranstionCustomerModal />
        <AllTransferModal />
        <CollaborationModal
          ref={collRef}
          onSuccess={handleGetChangeAndSearchData}
        />
        <CustomerDrawer ref={customerRef} />
      </>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <CProvider>
        <MyCustomer />
      </CProvider>
    </Provider>
  );
};
