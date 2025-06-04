import TXAuthContainer from "@/components/TXAuthContainer";
import { ProjectAuth } from "@/pages/mainData/projectManage/auth";
import EditClassifyModal from "./editClassifyModal";
import EditModal from "./editModal";
import Option from "./option";
import Sidebar from "./sidebar";
import { Provider } from "./store";
import Table from "./table";

const ChannelManager = () => {
  return (
    <TXAuthContainer auth={ProjectAuth.projectView}>
      <div className="flex">
        <Sidebar />
        <div className="w-[calc(100%-310px)]">
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
