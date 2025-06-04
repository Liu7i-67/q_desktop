import TXAuthContainer from "@/components/TXAuthContainer";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import { DictionaryV2Auth } from "./auth";
import type { IDictionaryV2Props } from "./interface";
import AddOrEditDictModal from "./modules/AddOrEditDictModal";
import DictionaryConfigDrawer from "./modules/DictionaryConfigDrawer";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const DictionaryV2 = observer(function DictionaryV2_(
  props: IDictionaryV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <TXAuthContainer auth={DictionaryV2Auth.dictView}>
      <SearchHeader />
      <TableList />
      <AddOrEditDictModal
        ref={refs.addOrEditDictModalRef}
        afterClose={logic.getList}
      />
      <DictionaryConfigDrawer ref={refs.dictionaryConfigDrawerRef} />
    </TXAuthContainer>
  );
});

export default observer(function DictionaryV2Page(props: IDictionaryV2Props) {
  return (
    <Provider>
      <DictionaryV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
