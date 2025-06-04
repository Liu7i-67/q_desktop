import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

export const PickerInfo = observer(function PickerInfo_() {
  const root = useStore();
  const { logic } = root;
  return <div>已选择：{logic.selectRecords[0]?.title || "-"}</div>;
});
