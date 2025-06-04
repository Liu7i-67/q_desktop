import TXAuthContainer from "@/components/TXAuthContainer";
import { PlatformAuth } from "@/pages/mainData/platformManage/auth";
import EditModal from "./editModal";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";

const PlatformManager = () => {
  return (
    <TXAuthContainer auth={PlatformAuth.platformView}>
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
      <PlatformManager />
    </Provider>
  );
};
