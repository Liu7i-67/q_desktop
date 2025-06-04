import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Segmented } from "antd";

export const SubTabRow = observer(function SubTabRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="bg-[#f5f5f5] my-4 rounded-[4px]">
      <Segmented<string>
        options={logic.options}
        value={logic.active}
        onChange={logic.changeActive}
      />
    </div>
  );
});
