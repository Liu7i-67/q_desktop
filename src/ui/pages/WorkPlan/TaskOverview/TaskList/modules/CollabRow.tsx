import { observer } from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

export const CollabRow = observer(function CollabRow_() {
  return (
    <Form.Item name="collabUserId" label="协作人">
      <TXSearchUserSelect placeholder="请选择" />
    </Form.Item>
  );
});
