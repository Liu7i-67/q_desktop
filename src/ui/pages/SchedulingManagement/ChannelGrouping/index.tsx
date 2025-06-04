import React, { useEffect } from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import type { IChannelGroupingProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { SearchHeader } from "./SearchHeader";
import { TableList } from "./TableList";
import EditChannelGroupingModal from "../EditChannelGroupingModal";

const ChannelGrouping = observer(function ChannelGrouping_(
  props: IChannelGroupingProps
) {
  const root = useStore();
  const { refs, logic } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <div>
      <SearchHeader />
      <TableList />
      <EditChannelGroupingModal ref={refs.editRef} onSuccess={logic.getList} />
    </div>
  );
});

export default observer(function ChannelGroupingPage(
  props: IChannelGroupingProps
) {
  return (
    <Provider>
      <ChannelGrouping {...props} />
    </Provider>
  );
});

export * from "./interface";
