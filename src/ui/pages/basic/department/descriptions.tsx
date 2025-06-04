import { Descriptions as AntdDescriptions, Empty } from "antd";
import { useSelector } from "./store";

const Descriptions: React.FC = () => {
  const { currentDept } = useSelector((x) => x.state);

  // 如果没有数据或者是空对象（没有任何属性）
  if (!currentDept || Object.keys(currentDept).length === 0) {
    return <Empty className="p-4" description="请选择部门查看详情" />;
  }

  const items = [
    {
      label: "部门名称",
      children: currentDept?.deptName,
      labelStyle: { width: "200px" },
    },
    {
      label: "创建时间",
      children: currentDept?.createTime,
    },
    {
      label: "修改时间",
      children: currentDept?.updateTime,
    },
  ];

  return <AntdDescriptions className="p-4" bordered column={1} items={items} />;
};

export default Descriptions;
