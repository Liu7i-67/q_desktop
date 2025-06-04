import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Checkbox, Form } from "antd";

export const HistoryRow = observer(function HistoryRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex items-center mb-4">
      <div>补录（备注：录入历史数据）</div>
      <Form.Item name="historyFlag" noStyle valuePropName="checked">
        <Checkbox value={true}></Checkbox>
      </Form.Item>
    </div>
  );
});
