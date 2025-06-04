import TXSearchForm from "@/components/TXSearchForm";
import { DatePicker, Form, Select, TreeSelect } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "../store";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PanelForm = () => {
  const panelForm = useSelector((x) => x.panelForm);
  const { runGetPanelData, runDeptTree } = useSelector((x) => x.api);
  const { panelReset, onPanelSearch } = useSelector((x) => x.logic);
  const { deptTree } = useSelector((x) => x.state);

  // 预设时间范围选项
  const timeRanges: Record<string, Dayjs[]> = {
    today: [dayjs().startOf("day"), dayjs().endOf("day")],
    yesterday: [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
    last7Days: [
      dayjs().subtract(6, "day").startOf("day"),
      dayjs().endOf("day"),
    ],
    thisMonth: [dayjs().startOf("month"), dayjs().endOf("day")],
    lastMonth: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  };

  // 处理预设范围选择变化
  const handleRangeChange = (value: string) => {
    panelForm.setFieldsValue({
      dateRange: timeRanges[value],
    });
  };

  return (
    <TXSearchForm
      form={panelForm}
      initialValues={{
        dateRange: [dayjs().startOf("month"), dayjs().endOf("day")],
        timeRangeSelect: "thisMonth",
      }}
      onReset={panelReset}
      onSearch={onPanelSearch}
      loading={runGetPanelData.loading}
    >
      <Form.Item
        label="时间跨度:"
        name="dateRange"
        rules={[{ required: true, message: "请选择时间范围" }]}
      >
        <RangePicker
          style={{ marginLeft: "1rem" }}
          disabledDate={(current) => {
            return current && current > dayjs().startOf("day");
          }}
        />
      </Form.Item>
      <Form.Item name="timeRangeSelect">
        <Select
          // className='w-[140px]'
          onChange={handleRangeChange}
          placeholder="选择时间范围"
          allowClear
        >
          <Option value="today">今天</Option>
          <Option value="yesterday">昨天</Option>
          <Option value="last7Days">近七天</Option>
          <Option value="thisMonth">当月</Option>
          <Option value="lastMonth">上月</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item label='时间跨度' style={{ marginBottom: 0, display: 'grid', gridTemplateColumns: '1fr 50px' }}>
        <Form.Item
          name='dateRange'
          style={{ display: 'inline-block', marginRight: 16 }}
          rules={[{ required: true, message: '请选择时间范围' }]}
        >
          <RangePicker
            disabledDate={(current) => {
              return current && current > dayjs().startOf('day');
            }}
          />
        </Form.Item>
        <Form.Item name='timeRangeSelect'>
          <Select
            // className='w-[140px]'
            onChange={handleRangeChange}
            placeholder='选择时间范围'
            allowClear
          >
            <Option value='today'>今天</Option>
            <Option value='yesterday'>昨天</Option>
            <Option value='last7Days'>近七天</Option>
            <Option value='thisMonth'>当月</Option>
            <Option value='lastMonth'>上月</Option>
          </Select>
        </Form.Item>
      </Form.Item> */}
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

export default PanelForm;
