import { observer } from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";

export const TaskRow = observer(function TaskRow_() {
  const userSearch = useSearchSelectFetch({
    fetchDataApi: "/api/business/v1/task-strategy/get-page",
    searchParamKey: "strategyName",
    request: {
      taskStrategyRole: "ALL",
    },
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.strategyName,
        value: item.id,
      })),
  });

  return (
    <Form.Item name="taskStrategyId" label="所属策略">
      <TXSearchSelect {...userSearch} placeholder="全部" allowClear />
    </Form.Item>
  );
});
