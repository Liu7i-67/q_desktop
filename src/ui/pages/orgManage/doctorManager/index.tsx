import { Provider } from "./store";
import Table from "./table";
import Option from "./option";
import EditModal from "./editModal";
const DoctorManager = () => {
  return (
    <>
      <Option />
      <Table />
      <EditModal />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <DoctorManager />
    </Provider>
  );
};
