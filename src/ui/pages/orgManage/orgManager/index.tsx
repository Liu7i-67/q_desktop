import TXAuthContainer from "@/components/TXAuthContainer";
import { OrganizationAuth } from "@/pages/orgManage/orgManager/auth";
import EditClassifyModal from "./editClassifyModal";
import EditModal from "./editModal";
import Option from "./option";
import Sidebar from "./sidebar";
import { Provider } from "./store";
import Table from "./table";

const OrgManager = () => {
  return (
    <TXAuthContainer auth={OrganizationAuth.organizationView}>
      <div className="flex">
        <Sidebar />
        <div className={"w-[calc(100%-310px)]"}>
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
      <OrgManager />
    </Provider>
  );
};
