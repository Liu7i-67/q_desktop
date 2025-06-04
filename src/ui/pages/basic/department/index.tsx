import { Provider } from "./store";

import TXAuthContainer from "@/components/TXAuthContainer";
import { DeptAuth } from "@/pages/basic/department/auth";
import Descriptions from "./descriptions";
import EditClassifyModal from "./editClassifyModal";
import Sidebar from "./sidebar";

const ChannelManager = () => {
  return (
    <TXAuthContainer auth={DeptAuth.deptView}>
      <div className="flex">
        <Sidebar />
        <div className="w-[calc(100%-310px)]">
          <Descriptions />
        </div>
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
