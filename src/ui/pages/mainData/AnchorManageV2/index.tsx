import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IAnchorManageV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import EditModal from "./modules/EditModal";
import TXAuthContainer from "@/components/TXAuthContainer";
import { LiveStreamerAuth } from "./auth";

const AnchorManageV2 = observer(function AnchorManageV2_(
  props: IAnchorManageV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <TXAuthContainer auth={LiveStreamerAuth.liveStreamerView}>
      <SearchHeader />
      <TableList />
      <EditModal ref={refs.editRef} afterClose={logic.getList} />
    </TXAuthContainer>
  );
});

export default observer(function AnchorManageV2Page(
  props: IAnchorManageV2Props
) {
  return (
    <Provider>
      <AnchorManageV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
