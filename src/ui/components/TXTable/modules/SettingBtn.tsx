import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { SettingOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const SettingBtn = observer(function SettingBtn_() {
  const root = useStore();
  const { logic, propsStore } = root;
  if (!propsStore.props.tableKey) {
    return null;
  }
  return (
    <Tooltip title="列表项配置">
      <div
        className="absolute top-0 right-0 z-20 border-[1px] rounded-md w-[24px] h-[24px] text-center cursor-pointer bg-[#fafafa]"
        onClick={logic.openSetting}
      >
        <SettingOutlined />
      </div>
    </Tooltip>
  );
});
