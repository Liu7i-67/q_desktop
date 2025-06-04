import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { ITXTableProps } from "./interface";
import { SettingBtn } from "./modules/SettingBtn";
import "./index.css";
import TXColumnsSettingModal from "./TXColumnsSettingModal";
import { useEffect } from "react";
import { TableList } from "./modules/TableList";
import TXErrorBoundary from "../TXErrorBoundary";
import { cn } from "@/utils/tools";

const TXTable = observer(function TXTable_<T extends object = any>(
  props: ITXTableProps<T>
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { refs, logic } = root;
  const { tableKey, loading, className = "", columns, size, ...rest } = props;

  useEffect(() => {
    logic.getLocalSetting(tableKey);
  }, [tableKey]);

  return (
    <div className={cn("tx-table", className)}>
      <TXErrorBoundary>
        <TableList<T> {...rest} />
      </TXErrorBoundary>
      <SettingBtn />
      <TXColumnsSettingModal
        ref={refs.settingRef}
        afterSave={logic.afterChange}
      />
    </div>
  );
});

export default observer(function TXTablePage<T extends object = any>(
  props: ITXTableProps<T>
) {
  return (
    <Provider>
      <TXTable {...props} />
    </Provider>
  );
});
