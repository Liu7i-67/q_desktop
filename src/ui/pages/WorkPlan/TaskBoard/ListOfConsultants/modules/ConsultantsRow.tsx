import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form } from "antd";
import TXEmployeePicker from "@/components/TXEmployeePicker";

export const ConsultantsRow = observer(function ConsultantsRow_() {
  const root = useStore();

  return (
    <Form.Item name="userIdList" label="咨询师">
      <TXEmployeePicker
        type="TASK_OWNER"
        className="!w-[300px]"
        placeholder="全部"
      />
    </Form.Item>
  );
});
