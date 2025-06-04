import TXAuthContainer from "@/components/TXAuthContainer";
import AddEmployeeModal from "@/pages/basic/employee/add-employee.modal";
import { UserAuth } from "@/pages/basic/employee/auth";
import Option from "@/pages/basic/employee/option";
import { Provider } from "@/pages/basic/employee/store";
import Table from "@/pages/basic/employee/table";

const Employee = () => {
  return (
    <TXAuthContainer auth={UserAuth.userView}>
      <div>
        <Option />
        <Table />
        <AddEmployeeModal />
      </div>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <Employee />
    </Provider>
  );
};
