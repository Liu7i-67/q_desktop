import { Tabs } from "antd";
import { useSelector } from "./store";
import Schedule from "./schedule";
import Shift from "./shift";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";

const XhsWorkforceTabs: React.FC = () => {
  const { activeTab } = useSelector((x) => x.state);
  const { setActiveTab } = useSelector((x) => x.logic);

  const items = [
    RedBookSchedulingAuth.redBookSchedulingView && {
      key: "schedule",
      label: "排班管理",
    },
    RedBookSchedulingAuth.redBookSchedulingShiftView && {
      key: "shift",
      label: "班次管理",
    },
  ];

  return (
    <>
      <Tabs
        className="px-4"
        activeKey={activeTab}
        items={items as any}
        onChange={setActiveTab}
      />
      {activeTab === "schedule" &&
      RedBookSchedulingAuth.redBookSchedulingView ? (
        <Schedule />
      ) : null}
      {activeTab === "shift" &&
      RedBookSchedulingAuth.redBookSchedulingShiftView ? (
        <Shift />
      ) : null}
    </>
  );
};

export default XhsWorkforceTabs;
