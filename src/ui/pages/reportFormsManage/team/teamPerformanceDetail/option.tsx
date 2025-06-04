import { Button, DatePicker, Form, TreeSelect } from "antd";
import dayjs from "dayjs";
import { useSelector } from "../store";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const reportDetailForm = useSelector((x) => x.reportDetailForm);
  const { runGetPanelData, runDeptTree } = useSelector((x) => x.api);
  const { reportReset, onReportSearch } = useSelector((x) => x.logic);
  const { deptTree } = useSelector((x) => x.state);

  return (
    <TXSearchForm
      form={reportDetailForm}
      onReset={reportReset}
      onSearch={onReportSearch}
      loading={runGetPanelData.loading}
      initialValues={{
        // dateRange:[dayjs().startOf("month"), dayjs().endOf("month")] ,
        dateRange: dayjs(),
      }}
    >
      <Form.Item
        label="时间跨度"
        name="dateRange"
        style={{ marginRight: 16 }}
        rules={[{ required: true, message: "请选择时间范围" }]}
      >
        <DatePicker.MonthPicker
          style={{ display: "block" }}
          disabledDate={(current) =>
            current && current > dayjs().endOf("month")
          }
        />
      </Form.Item>
      <Form.Item name="dept" label="部门">
        <TreeSelect
          multiple
          loading={runDeptTree.loading}
          maxTagCount={3}
          // className={'!w-[180px]'}
          placeholder={"请选择部门"}
          treeData={deptTree as any}
          fieldNames={{
            label: "deptName",
            value: "id",
            children: "childList",
          }}
          allowClear={true}
          labelInValue
        />
      </Form.Item>
    </TXSearchForm>
  );
};

export default Option;
