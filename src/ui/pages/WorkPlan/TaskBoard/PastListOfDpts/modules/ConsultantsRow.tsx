import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form } from "antd";
import TXEmployeePicker from "@/components/TXEmployeePicker";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { getDeptTree } from "@/pages/Workbench/FollowUpToday/store/tools";

export const ConsultantsRow = observer(function ConsultantsRow_() {
  const root = useStore();
  const { propsStore } = root;

  const deptProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/sys-dept/tree",
    // @ts-ignore
    transformTree: (data) => getDeptTree(data || []),
  });

  return (
    <Form.Item name="deptIdList" label="部门">
      <TXTreeSelect
        multiple
        placeholder="全部"
        {...deptProps}
        showCheckedStrategy="SHOW_ALL"
        className="!w-[300px]"
      />
    </Form.Item>
  );
});
