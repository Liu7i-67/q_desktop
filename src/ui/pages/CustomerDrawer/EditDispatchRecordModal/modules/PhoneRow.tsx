import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Select } from "antd";

export const PhoneRow = observer(function PhoneRow_() {
  const root = useStore();
  const { logic, computed } = root;
  return (
    <Form.Item
      label="派单电话"
      name="phoneNumber"
      rules={[{ required: true, message: "请选择派单电话" }]}
    >
      <Select
        placeholder="请选择派单电话"
        options={computed.phoneOptions}
        onChange={logic.getAvailableOrg}
      />
    </Form.Item>
  );
});
