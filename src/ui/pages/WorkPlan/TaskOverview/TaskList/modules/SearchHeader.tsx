import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { DatePicker, Form, Select } from "antd";
import TXSearchForm, { TXSearchItemWrapper } from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { TXLowerCaseInput } from "@/components/TXForm/modules/TXLowerCaseInput";
import { CollabRow } from "./CollabRow";
import TXEmployeePicker, {
  maxTagPlaceholder,
} from "@/components/TXEmployeePicker";
import { TaskRow } from "./TaskRow";
import { todayTaskOptions } from "@/utils/enum/modules/todayTaskStatus";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
      }}
      form={refs.form}
      onReset={logic.onReset}
      formKey="WORKPLAN_TASK_OVERVIEW_TASK_LIST"
    >
      <Form.Item name="endDate" label="任务截止时间">
        <DatePicker.RangePicker />
      </Form.Item>
      <TXSearchItemWrapper name="taskStrategyId" label="所属策略">
        <TaskRow />
      </TXSearchItemWrapper>
      <Form.Item name="ownerUserId" label="客户所属人">
        <TXEmployeePicker className="!w-[300px]" />
      </Form.Item>
      <TXSearchItemWrapper name="collabUserId" label="协作人">
        <CollabRow />
      </TXSearchItemWrapper>
      <Form.Item label="客户电话/微信" name="customerKeyword">
        <TXLowerCaseInput
          placeholder="请输入客户电话/微信"
          allowClear
          needTrim
        />
      </Form.Item>
      <Form.Item name="userIdList" label="任务所属人">
        <TXEmployeePicker
          type="TASK_OWNER"
          itemClassName="max-w-[150px]"
          className="!w-[300px]"
        />
      </Form.Item>
      <Form.Item name="followStatusEnumList" label="任务状态">
        <Select
          placeholder="全部"
          allowClear
          mode="multiple"
          options={todayTaskOptions}
          maxTagCount={1}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Form.Item>
      <Form.Item name="startDate" label="任务开始时间">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item name="followedTime" label="任务完成时间">
        <DatePicker.RangePicker />
      </Form.Item>
    </TXSearchForm>
  );
});
