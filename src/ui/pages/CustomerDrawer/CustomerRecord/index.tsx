import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import type { ICustomerRecordProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { cn } from "@/utils/tools";
import { NoData } from "./modules/NoData";
import { Spin } from "antd";
import { useScroll } from "@/hooks/useScroll";
import { TableList } from "./modules/TableList";
import { NoMore } from "./modules/NoMore";
import { OptionRow } from "./modules/OptionRow";

const CustomerRecord = observer(function CustomerRecord_(
  props: ICustomerRecordProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, propsStore, computed } = root;
  const { show } = props;
  const sc = useScroll({
    onScrollToBottom: logic.nextPage,
  });

  useWhen(
    () => show && !!propsStore.props.detail?.id,
    () => {
      logic.getList();
    }
  );

  return (
    <div
      className={cn(
        "p-2 max-h-[calc(100vh-168px)] overflow-y-auto",
        show ? "" : "hidden"
      )}
      ref={sc.ref}
      onScroll={sc.handleScroll}
    >
      <Spin spinning={computed.loading}>
        <OptionRow />
        <NoData />
        <TableList />
        <NoMore />
      </Spin>
    </div>
  );
});

export default observer(function CustomerRecordPage(
  props: ICustomerRecordProps
) {
  return (
    <Provider>
      <CustomerRecord {...props} />
    </Provider>
  );
});

export * from "./interface";
