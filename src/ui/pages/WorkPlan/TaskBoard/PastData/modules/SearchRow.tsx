import { observer } from "@quarkunlimit/qu-mobx";
import { TaskCell } from "./TaskCell";
import { RangeCell } from "./RangeCell";

export const SearchRow = observer(function SearchRow_() {
  return (
    <div className="bg-[#f7f8fc] py-2 px-4 rounded-md flex items-center gap-8">
      <TaskCell />
      <RangeCell />
    </div>
  );
});
