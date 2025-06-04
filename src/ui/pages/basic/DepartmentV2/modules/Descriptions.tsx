import { observer } from "@quarkunlimit/qu-mobx";
import { Descriptions as AntdDescriptions, Empty, Spin } from "antd";
import { isEmpty } from "lodash";
import { useStore } from "../store/RootStore";

const Descriptions = observer(function _Descriptions() {
  const root = useStore();
  const { logic, computed } = root;
  const items = [
    {
      label: "部门名称",
      children: logic.deptDetailInfo.deptName,
      labelStyle: { width: "200px" },
    },
    {
      label: "创建时间",
      children: logic.deptDetailInfo.createTime,
    },
    {
      label: "修改时间",
      children: logic.deptDetailInfo.updateTime,
    },
  ];
  return (
    <Spin spinning={computed.loading}>
      {isEmpty(logic.deptDetailInfo) ? (
        <Empty className="p-4" description="请选择部门查看详情" />
      ) : (
        <AntdDescriptions className="p-4" bordered column={1} items={items} />
      )}
    </Spin>
  );
});

export default Descriptions;
