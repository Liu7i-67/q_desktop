import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

export const NoMore = observer(function NoMore_() {
  const root = useStore();
  const { logic } = root;
  if (logic.dataSource.length < logic.pagination.total) {
    return null;
  }

  return (
    <div className="text-center text-gray-400 py-8">-- 没有更多数据了 --</div>
  );
});
