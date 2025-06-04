import { observer, toJS } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Skeleton, Table, TableProps } from "antd";
import { ITXColumnType } from "../interface";

export const TableList = observer(function TableList_<T extends object = any>(
  props: Omit<TableProps, "size" | "loading" | "columns">
) {
  const root = useStore();
  const { logic, propsStore, computed } = root;
  const { scroll, ...rest } = props;
  if (!logic.haveInit) {
    return <Skeleton />;
  }

  return (
    // @ts-ignore
    <Table<T>
      size={logic.localSetting.tableSize || propsStore.props.size}
      loading={(propsStore.props.loading as boolean) || computed.loading}
      columns={computed.columns as ITXColumnType<T>[]}
      scroll={computed.scroll}
      {...rest}
    />
  );
});
