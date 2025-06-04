import TXAuthContainer from "@/components/TXAuthContainer";
import { AdvertiserManagementAuth } from "@/pages/xhs-spotlight/advertise/auth";
import EditModal from "./editModal";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";

const Advertise = () => {
  return (
    <TXAuthContainer auth={AdvertiserManagementAuth.advertiserManagementView}>
      <>
        <Option />
        <Table />
        <EditModal />
      </>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <Advertise />
    </Provider>
  );
};
