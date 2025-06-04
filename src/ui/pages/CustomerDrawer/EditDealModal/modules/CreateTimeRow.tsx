import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { DatePicker, Form } from "antd";

export const CreateTimeRow = observer(function CreateTimeRow_() {
  const root = useStore();
  const { refs } = root;
  const historyFlag = Form.useWatch("historyFlag", refs.form);
  if (!historyFlag) {
    return null;
  }

  return (
    <Form.Item
      label="上报时间"
      name="createTime"
      rules={[{ required: true, message: "请选择上报时间" }]}
    >
      <DatePicker showTime className="w-full" placeholder="请选择上报时间" />
    </Form.Item>
  );
});
