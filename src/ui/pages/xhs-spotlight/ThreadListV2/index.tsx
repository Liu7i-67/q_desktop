import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { IThreadListV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";

const ThreadListV2 = observer(function ThreadListV2_(
  props: IThreadListV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div>
      <SearchHeader />
      <TableList />
    </div>
  );
});

export default observer(function ThreadListV2Page(props: IThreadListV2Props) {
  return (
    <Provider>
      <ThreadListV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
