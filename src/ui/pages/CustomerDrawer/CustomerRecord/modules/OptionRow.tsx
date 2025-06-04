import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex pb-2">
      <Button type="default" className="ml-2" onClick={logic.refresh}>
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
});
