import TXAuthContainer from "@/components/TXAuthContainer";
import { ThreadLisAuth } from "@/pages/xhs-spotlight/threadList/auth";
import Option from "./option";
import { Provider } from "./store";
import Table from "./table";

const ThreadList = () => {
  return (
    <TXAuthContainer auth={ThreadLisAuth.littleRedBookLeadsView}>
      <>
        <Option />
        <Table />
      </>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <ThreadList />
    </Provider>
  );
};
