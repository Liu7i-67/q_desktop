import { observer } from "@quarkunlimit/qu-mobx";
import { DatePicker, Form } from "antd";

export const DealDateRow = observer(function DealDateRow_() {
  return (
    <Form.Item
      label="成交时间"
      name="dealDate"
      rules={[{ required: true, message: "请选择成交时间" }]}
      className="flex-1"
    >
      <DatePicker className="w-full" placeholder="请选择成交时间" />
    </Form.Item>
  );
});
