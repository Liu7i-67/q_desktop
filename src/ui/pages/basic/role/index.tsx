import TXAuthContainer from "@/components/TXAuthContainer";
import { RoleAuth } from "@/pages/basic/role/auth";
import EditModal from "./editModal";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";

const Role = () => {
  return (
    <TXAuthContainer auth={RoleAuth.roleView}>
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
      <Role />
    </Provider>
  );
};
