import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Segmented } from "antd";

export const SubTabRow = observer(function SubTabRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <Segmented<string>
      className="-ml-4"
      options={logic.options}
      value={logic.active}
      onChange={logic.changeActive}
    />
  );
});
