import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { DatePicker, Form, Input } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { getChannelTreeOptions } from "@/utils/treeTransform";
import TXChannelPicker from "@/components/TXChannelPicker";
import TXEmployeePicker from "@/components/TXEmployeePicker";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
      }}
      formKey="ADVERTISING_PLAN_MANAGEMENT"
      onReset={() => {
        logic.onSearch({});
      }}
    >
      <Form.Item label="广告计划名称" name="campaignName">
        <Input placeholder="请输入" maxLength={255}></Input>
      </Form.Item>
      <Form.Item name="channelIdList" label="所属渠道">
        <TXChannelPicker multiple placeholder="请选择来源渠道" />
      </Form.Item>
      <Form.Item label="负责人" name="userIdList">
        <TXEmployeePicker type="TASK_OWNER" placeholder="请选择负责人" />
      </Form.Item>
      <Form.Item label="创建时间" name="createTime">
        <DatePicker.RangePicker />
      </Form.Item>
    </TXSearchForm>
  );
});
