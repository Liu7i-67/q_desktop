import { Tabs, TabsProps } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import TeamPanel from "./teamPanel";
import TeamPerformanceDetail from "./teamPerformanceDetail";
import TeamPerformanceOverview from "./teamPerformanceOverview";

const Tag = () => {
  const { activeKey } = useSelector((x) => x.state);
  const { setActiveKey, getDeptTree } = useSelector((x) => x.logic);

  useEffect(() => {
    setActiveKey("teamPanel");
    getDeptTree();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "teamPanel",
      label: "团队业绩仪表盘",
      children: <TeamPanel />,
    },
    {
      key: "teamPerformanceDetail",
      label: "团队业绩明细",
      children: <TeamPerformanceDetail />,
    },
    {
      key: "teamPerformanceOverview",
      label: "团队业绩总览",
      children: <TeamPerformanceOverview />,
    },
  ];

  // 切换tab
  const clickOnChange = (key: string) => {
    setActiveKey(key);
  };

  return <Tabs onChange={clickOnChange} activeKey={activeKey} items={items} />;
};

export default Tag;
