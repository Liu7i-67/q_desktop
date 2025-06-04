import { cn } from "@/utils/tools";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import { TaskStrategyAuth } from "../../auth";
import type { IManageStartgyProps } from "./interface";
import { CreateButton } from "./modules/CreateButton";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const ManageStartgy = observer(function ManageStartgy_(
  props: IManageStartgyProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  useEffect(() => {
    if (props.visible) {
      logic.getList();
    }
  }, [props.visible]);

  return (
    <>
      {TaskStrategyAuth.taskStrategyCreate && (
        <CreateButton
          className={props.visible ? "" : "hidden"}
          onStrategyVisibleChange={props.onStrategyVisibleChange}
          onSetManageStartgyEditId={props.onSetManageStartgyEditId}
        />
      )}
      <div className={cn("p-2", props.visible ? "" : "hidden")}>
        <TableList />
      </div>
    </>
  );
});

export default observer(function ManageStartgyPage(props: IManageStartgyProps) {
  return (
    <Provider>
      <ManageStartgy {...props} />
    </Provider>
  );
});

export * from "./interface";
