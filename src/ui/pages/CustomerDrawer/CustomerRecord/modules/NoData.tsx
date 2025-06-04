import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

export const NoData = observer(function NoData_() {
  const root = useStore();
  const { logic } = root;
  if (logic.dataSource.length) {
    return null;
  }

  return (
    <div className="text-center text-gray-400 py-8">-- 暂无操作记录 --</div>
  );
});
