import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TaskCell } from "./TaskCell";

export const SearchRow = observer(function SearchRow_() {
  const root = useStore();

  return (
    <div className="bg-[#f7f8fc] py-2 px-4 rounded-md flex items-center gap-8">
      <TaskCell />
    </div>
  );
});
