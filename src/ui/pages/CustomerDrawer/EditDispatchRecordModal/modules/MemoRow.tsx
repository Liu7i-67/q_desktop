import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Input } from "antd";

export const MemoRow = observer(function MemoRow_() {
  return (
    <Form.Item label="派单留言" name="memo">
      <Input.TextArea
        placeholder="请输入派单留言"
        maxLength={200}
        showCount
        rows={4}
      />
    </Form.Item>
  );
});
