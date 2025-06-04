import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export const ExpandBtn = observer(function ExpandBtn_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.renderExpand) {
    return null;
  }

  return (
    <Button type="link" className="expand-btn" onClick={logic.changeExpand}>
      {logic.expand ? <UpOutlined /> : <DownOutlined />}
      {logic.expand ? "收起" : "展开"}
    </Button>
  );
});
