import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import type { IDownload_mobxProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import Table from "./table";
import Option from "./option";

const Download_mobx = observer(function Download_mobx_(
  props: IDownload_mobxProps
) {
  const root = useStore();

  return (
    <div>
      <Option />
      <Table />
    </div>
  );
});

export default observer(function Download_mobxPage(props: IDownload_mobxProps) {
  return (
    <Provider>
      <Download_mobx {...props} />
    </Provider>
  );
});

export * from "./interface";
