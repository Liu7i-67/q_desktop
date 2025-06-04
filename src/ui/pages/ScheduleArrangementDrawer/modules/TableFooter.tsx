import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";

export const TableFooter = observer(function TableFooter_() {
  const root = useStore();
  const { logic } = root;

  if (!RedBookSchedulingAuth.redBookSchedulingUpdate) {
    return null;
  }

  return (
    <Button type="dashed" onClick={logic.addRecordRow} block>
      新增行
    </Button>
  );
});
