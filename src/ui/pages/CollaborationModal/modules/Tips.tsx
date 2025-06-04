import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const Tips = observer(function Tips_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.initData?.justAdd) return null;

  return (
    <Tooltip title="通过查重入口进入时，仅允许操作官方合作，不允许修改协作合作">
      <QuestionCircleOutlined className="ml-4 cursor-pointer" />
    </Tooltip>
  );
});
