import TXSearchForm, { TXSearchItemWrapper } from "@/components/TXSearchForm";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TreeSelect,
} from "antd";

export const Search = function Search_() {
  return (
    <TXSearchForm
      onSearch={(value) => {
        console.log(value);
      }}
      onReset={() => {}}
    >
      <TXSearchItemWrapper name="" label="" disabledSetting>
        <Button type="primary" className="mr-4">
          新增客户线索
        </Button>
      </TXSearchItemWrapper>
      <TXSearchItemWrapper
        name="phoneNumber"
        label="客户电话"
        className="flex gap-4"
      >
        <Form.Item name="phoneNumber" label="线索电话">
          <Input placeholder="请输入线索电话" />
        </Form.Item>
        <Button type="primary" className="mr-4">
          查重
        </Button>
      </TXSearchItemWrapper>
      <TXSearchItemWrapper
        name="wechatNumber"
        label="客户微信"
        className="flex gap-4"
      >
        <Form.Item name="wechatNumber" label="线索客户微信">
          <Input placeholder="请输入微信号" />
        </Form.Item>
        <Button type="primary" className="mr-4">
          查重
        </Button>
      </TXSearchItemWrapper>
      <TXSearchItemWrapper name="onlyCollabType" label="协作类型">
        <Form.Item name="onlyCollabType" label="">
          <Radio.Group>
            <Radio value="OFFICIAL">官方协作客户</Radio>
            <Radio value="COLLABORATION">协作合作客户</Radio>
          </Radio.Group>
        </Form.Item>
      </TXSearchItemWrapper>
      <Form.Item name="customerName" label="客户姓名">
        <Input placeholder="请输入客户姓名" />
      </Form.Item>
      <Form.Item name="areaCode" label="城市">
        <TreeSelect
          showSearch
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="请选择城市"
          allowClear
          treeData={[]}
          filterTreeNode={(inputValue, node) =>
            (node.title as string)
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) > -1
          }
        />
      </Form.Item>
      <Form.Item name="channelId" label="广告渠道">
        <Select
          placeholder="请选择广告渠道"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={[]}
        />
      </Form.Item>
      <Form.Item name="platformId" label="平台">
        <Select
          placeholder="请选择平台"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={[]}
        />
      </Form.Item>
      <Form.Item name="liveStreamerId" label="主播">
        <Select
          placeholder="请选择主播"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={[]}
        />
      </Form.Item>
      <Form.Item name="createTime" label="创建时间">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item name="assignTime" label="分配时间">
        <DatePicker.RangePicker />
      </Form.Item>
    </TXSearchForm>
  );
};
