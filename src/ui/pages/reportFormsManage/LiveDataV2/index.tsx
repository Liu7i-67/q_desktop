import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { ILiveDataV2Props } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import LiveDataDetailDrawer from "@/pages/LiveDataDetailDrawer";
import LiveDataDetailSecondDrawer from "./modules/LiveDataDetailSecondDrawer";
import LiveDataDealDrawer from "./modules/LiveDataDealDrawer";

const LiveDataV2 = observer(function LiveDataV2_(props: ILiveDataV2Props) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div>
      <SearchHeader />
      <TableList />
      <LiveDataDetailDrawer ref={refs.detailRef} />
      <LiveDataDetailSecondDrawer ref={refs.secondDetailRef} />
      <LiveDataDealDrawer ref={refs.dealRef} />
    </div>
  );
});

export default observer(function LiveDataV2Page(props: ILiveDataV2Props) {
  return (
    <Provider>
      <LiveDataV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
