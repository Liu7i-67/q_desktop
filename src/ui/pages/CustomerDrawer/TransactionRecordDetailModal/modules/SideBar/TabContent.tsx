import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";
import { Tabs } from "antd";

export const TabContent = observer(function TabContent_() {
  const root = useStore();
  const { logic } = root;

  return (
    <Tabs
      activeKey={logic.activeKey}
      items={logic.items}
      onChange={logic.changeActive}
    />
  );
});
