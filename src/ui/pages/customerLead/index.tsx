import TXAuthContainer from "@/components/TXAuthContainer";
import { CustomerLeadsAuth } from "@/pages/customerLead/auth";
import CustPeekModal from "@/pages/customerLead/cust-peek-modal";
import CoordinateModal from "./coordinateModal";
import EditModal from "./editModal";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";
// import { Search } from "./Search";

const CustomerLead = () => {
  return (
    <TXAuthContainer auth={CustomerLeadsAuth.customerLeadsView}>
      <>
        <Option />
        {/* <Search /> */}
        <Table />
        <EditModal />
        <CoordinateModal />
        <CustPeekModal />
      </>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <CustomerLead />
    </Provider>
  );
};
