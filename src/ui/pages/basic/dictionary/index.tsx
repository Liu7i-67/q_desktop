import TXAuthContainer from "@/components/TXAuthContainer";
import AddModal from "@/pages/basic/dictionary/add-modal";
import { DictAuth } from "@/pages/basic/dictionary/auth";
import AddDictValueModal from "@/pages/basic/dictionary/components/dict-config-drawer/add-dict-value-modal";
import DictConfigDrawer from "@/pages/basic/dictionary/components/dict-config-drawer/dict-config-drawer";
import Option from "@/pages/basic/dictionary/option";
import { Provider, useSelector } from "@/pages/basic/dictionary/store";
import Table from "@/pages/basic/dictionary/table";

const Dictionary = () => {
  const { dictValueDrawerVisible } = useSelector((x) => x.state);
  return (
    <TXAuthContainer auth={DictAuth.dictView}>
      <div>
        <Option />
        <Table />
        <AddModal />
        {dictValueDrawerVisible && <DictConfigDrawer />}
        <AddDictValueModal />
      </div>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <Dictionary />
    </Provider>
  );
};
