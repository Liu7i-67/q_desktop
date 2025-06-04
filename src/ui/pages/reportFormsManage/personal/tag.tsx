import { Tabs, TabsProps } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import PersonalPanel from "./personalPanel";
import PersonalPerformance from "./personalPerformance";

const Tag = () => {
  const { activeKey } = useSelector((x) => x.state);
  const { setActiveKey } = useSelector((x) => x.logic);

  useEffect(() => {
    setActiveKey("personalPanel");
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "personalPanel",
      label: "个人业绩仪表盘",
      children: <PersonalPanel />,
    },
    {
      key: "personalPerformance",
      label: "个人业绩明细",
      children: <PersonalPerformance />,
    },
  ];

  // 切换tab
  const clickOnChange = (key: string) => {
    setActiveKey(key);
  };

  return <Tabs onChange={clickOnChange} activeKey={activeKey} items={items} />;
};

export default Tag;
