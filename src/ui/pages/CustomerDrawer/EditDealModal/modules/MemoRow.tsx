import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Input } from "antd";

export const MemoRow = observer(function MemoRow_() {
  return (
    <Form.Item label="成交备注" name="memo">
      <Input.TextArea
        placeholder="请输入成交备注"
        maxLength={200}
        showCount
        rows={3}
      />
    </Form.Item>
  );
});
