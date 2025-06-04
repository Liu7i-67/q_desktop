import { Button, DatePicker, Form, Select, TreeSelect } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ReportCode } from "../../types";
import { useSelector } from "../store";
import TXSearchForm from "@/components/TXSearchForm";
import { TeamAuth } from "../auth";

const { RangePicker } = DatePicker;

const Option = () => {
  const reportOverviewForm = useSelector((x) => x.reportOverviewForm);
  const {
    runGetPanelData,
    runDeptTree,
    runOverviewExport,
    runPersonOverviewExport,
  } = useSelector((x) => x.api);
  const { overviewReset, onOverviewSearch, overviewExport } = useSelector(
    (x) => x.logic
  );
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
    reportOverviewForm.setFieldsValue({
      dateRange: timeRanges[value],
    });
  };

  return (
    <TXSearchForm
      form={reportOverviewForm}
      onReset={overviewReset}
      onSearch={onOverviewSearch}
      loading={runGetPanelData.loading}
      initialValues={{
        dateRange: [dayjs().startOf("day"), dayjs().endOf("day")],
        timeRangeSelect: "today",
      }}
    >
      {TeamAuth.teamPerformance_teamDetail && (
        <Button
          type="primary"
          loading={runOverviewExport.loading}
          onClick={() =>
            overviewExport(ReportCode.Team_Performance_Internal_Schedule)
          }
        >
          团队详情导出
        </Button>
      )}
      {TeamAuth.teamPerformance_personalDetail && (
        <Button
          type="primary"
          loading={runPersonOverviewExport.loading}
          onClick={() =>
            overviewExport(ReportCode.Personal_Transaction_Schedule)
          }
        >
          成交详情导出
        </Button>
      )}
      <Form.Item
        label="时间跨度"
        name="dateRange"
        style={{ display: "inline-block", marginRight: 16 }}
        rules={[{ required: true, message: "请选择时间范围" }]}
      >
        <RangePicker
          disabledDate={(current) => {
            return current && current > dayjs().startOf("day");
          }}
        />
      </Form.Item>
      <Form.Item name="timeRangeSelect" className="inline-block">
        <Select
          className="w-[120px]"
          onChange={handleRangeChange}
          placeholder="选择时间范围"
          allowClear
        >
          <Select.Option value="today">今天</Select.Option>
          <Select.Option value="yesterday">昨天</Select.Option>
          <Select.Option value="last7Days">近七天</Select.Option>
          <Select.Option value="thisMonth">当月</Select.Option>
          <Select.Option value="lastMonth">上月</Select.Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label='时间跨度' style={{ marginBottom: 0 }}>
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
        <Form.Item name='timeRangeSelect' className='inline-block'>
          <Select
            className='w-[120px]'
            onChange={handleRangeChange}
            placeholder='选择时间范围'
            allowClear
          >
            <Select value='today'>今天</Select>
            <Select value='yesterday'>昨天</Select>
            <Select value='last7Days'>近七天</Select>
            <Select value='thisMonth'>当月</Select>
            <Select value='lastMonth'>上月</Select>
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

export default Option;
