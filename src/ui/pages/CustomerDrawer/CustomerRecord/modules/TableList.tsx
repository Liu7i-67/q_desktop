import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Timeline } from "antd";
import { RecordItem } from "./RecordItem";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic } = root;

  return (
    <Timeline
      className="mt-4"
      items={logic.dataSource.map((item, index) => ({
        color: item.operateType === "DISPATCH" ? "green" : "blue",
        children: <RecordItem key={index} record={item} />,
      }))}
    />
  );
});
