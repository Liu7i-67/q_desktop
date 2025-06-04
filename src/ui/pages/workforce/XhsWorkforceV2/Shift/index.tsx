import { useEffect } from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import type { IShiftProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { TableList } from "./modules/TableList";
import Option from "./modules/Option";
import EditModal from "./modules/EditModal";
import { cn } from "@/utils/tools";

const Shift = observer(function Shift_(props: IShiftProps) {
  const { visible } = props;
  const root = useStore();
  const { logic, refs } = root;

  useEffect(() => {
    if (visible) {
      logic.getList();
    }
  }, [visible]);

  return (
    <div className={cn("", visible ? "" : "hidden")}>
      <Option />
      <TableList />
      <EditModal ref={refs.editRef} afterClose={logic.getList} />
    </div>
  );
});

export default observer(function ShiftPage(props: IShiftProps) {
  return (
    <Provider>
      <Shift {...props} />
    </Provider>
  );
});

export * from "./interface";
