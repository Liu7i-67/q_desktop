import TXAuthContainer from "@/components/TXAuthContainer";
import { ChannelAuth } from "@/pages/channel/channelManage/auth";
import EditClassifyModal from "./editClassifyModal";
import EditModal from "./editModal";
import Option from "./option";
import Sidebar from "./sidebar";
import { Provider } from "./store";
import Table from "./table";

const ChannelManager = () => {
  return (
    <TXAuthContainer auth={ChannelAuth.channelView}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Option />
          <Table />
        </div>
        <EditModal />
        <EditClassifyModal />
      </div>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <ChannelManager />
    </Provider>
  );
};
