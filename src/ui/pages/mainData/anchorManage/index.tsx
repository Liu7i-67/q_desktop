import TXAuthContainer from "@/components/TXAuthContainer";
import { LiveStreamerAuth } from "@/pages/mainData/anchorManage/auth";
import EditModal from "./editModal";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";

const AnchorManager = () => {
  return (
    <TXAuthContainer auth={LiveStreamerAuth.liveStreamerView}>
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
      <AnchorManager />
    </Provider>
  );
};
