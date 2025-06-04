import { observer } from "@quarkunlimit/qu-mobx";
import TXEmployeePicker from "@/components/TXEmployeePicker";
import { useStore } from "../store/RootStore";

export const TaskOwnerRow = observer(function TaskOwnerRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="px-[16px]">
      <span>任务所属人：</span>
      <TXEmployeePicker
        type="TASK_OWNER_CALENDAR"
        className="!w-[300px]"
        value={logic.taskOrg}
        onChange={logic.changeTaskOrg}
      />
    </div>
  );
});
