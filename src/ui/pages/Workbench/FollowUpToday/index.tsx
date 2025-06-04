import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { IFollowUpTodayProps } from "./interface";
import { cn } from "@/utils/tools";
import { SearchForm } from "./modules/SearchForm";
import { useEffect } from "react";
import { TableList } from "./modules/TableList";
import CustomerDrawer from "@/pages/CustomerDrawer";

const FollowUpToday = observer(function FollowUpToday_(
  props: IFollowUpTodayProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  useEffect(() => {
    if (props.visible) {
      logic.init();
    }
  }, [props.visible]);

  return (
    <div className={cn("", props.visible ? "" : "hidden")}>
      <SearchForm />
      <TableList />
      <CustomerDrawer ref={refs.customerRef} />
    </div>
  );
});

export default observer(function FollowUpTodayPage(props: IFollowUpTodayProps) {
  return (
    <Provider>
      <FollowUpToday {...props} />
    </Provider>
  );
});
