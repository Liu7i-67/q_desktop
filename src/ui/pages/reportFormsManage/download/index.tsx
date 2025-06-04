import { Provider } from "./store";
import Table from "./table";
import Option from "./option";

const Download = () => {
  return (
    <>
      <Option />
      <Table />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <Download />
    </Provider>
  );
};
