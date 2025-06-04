import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input, Select, DatePicker, Button } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { ThreadLisAuth } from "@/pages/xhs-spotlight/threadList/auth";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { computed, logic } = root;

  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    request: {
      enableFlag: true,
    },
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
  });

  return (
    <TXSearchForm onSearch={logic.onSearch} onReset={logic.onReset}>
      {ThreadLisAuth.littleRedBookLeadsExport && (
        <Button
          type={"primary"}
          onClick={logic.exportList}
          loading={computed.loading}
        >
          导出excel
        </Button>
      )}
      <Form.Item name="phoneNum" label="电话号码">
        <Input placeholder="请输入电话号码" />
      </Form.Item>

      <Form.Item name="wechat" label="微信">
        <Input placeholder="请输入微信号" />
      </Form.Item>
      <Form.Item name="channelIdList" label="私信接收人">
        <TXSearchSelect
          {...channelProps}
          placeholder="请选择私信接收人"
          mode="multiple"
        />
      </Form.Item>

      <Form.Item name="campaignName" label="计划名称">
        <Input placeholder="请输入计划名称" />
      </Form.Item>
      <Form.Item name="createTime" label="创建日期">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>

      <Form.Item name="redId" label="用户ID">
        <Input placeholder="请输入用户ID" />
      </Form.Item>

      <Form.Item name="address" label="用户地址">
        <Input placeholder="请输入用户地址" />
      </Form.Item>

      <Form.Item name="leadsTagList" label="线索标签">
        <Select
          mode="multiple"
          placeholder="请选择线索标签"
          allowClear
          options={[
            { value: "跟进中", label: "跟进中" },
            { value: "留客资", label: "留客资" },
            { value: "高潜成交", label: "高潜成交" },
            { value: "已成单", label: "已成单" },
            { value: "无意向", label: "无意向" },
          ]}
        />
      </Form.Item>

      <Form.Item name="littleRedBookLeadsSource" label="小红书来源">
        <Select
          placeholder="请选择来源"
          allowClear
          options={[
            { value: "NATURAL_FLOW", label: "自然流" },
            { value: "PUT_IN", label: "投放" },
            { value: "UNKNOWN", label: "未知" },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
