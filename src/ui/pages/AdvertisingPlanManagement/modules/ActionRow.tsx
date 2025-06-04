import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const ActionRow = observer(function ActionRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="mb-1">
      <Button onClick={logic.getList}>
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
});
