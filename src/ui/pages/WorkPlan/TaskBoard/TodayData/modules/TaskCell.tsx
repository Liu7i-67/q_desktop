import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";

export const TaskCell = observer(function TaskCell_() {
  const root = useStore();
  const { logic } = root;

  const userSearch = useSearchSelectFetch({
    fetchDataApi: "/api/business/v1/task-strategy/get-page",
    searchParamKey: "strategyName",
    request: {
      taskStrategyRole: "EXECUTOR",
    },
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.strategyName,
        value: item.id,
      })),
  });

  return (
    <div>
      <span>任务策略：</span>
      <TXSearchSelect
        {...userSearch}
        placeholder="全部"
        value={logic.taskId || null}
        onChange={logic.changeTaskId}
        className="w-[240px]"
        allowClear
      />
    </div>
  );
});
