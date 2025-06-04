import TXSearchForm, { TXSearchItemWrapper } from "@/components/TXSearchForm";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useStore } from "../store/RootStore";

export const Option = observer(function Option_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
  });

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
  });

  const platFormProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/platform/get-page",
    searchParamKey: "platformName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.platformName, value: item.id })),
  });

  return (
    <TXSearchForm
      form={refs.form}
      onReset={logic.reset}
      formKey="CUSTOMER_ASSIGN_ASSGIN_LIST"
      onSearch={logic.onSearch}
      loading={computed.loading}
    >
      <TXSearchItemWrapper name="" label="" disabledSetting>
        <Button
          type={"primary"}
          className="mr-6"
          onClick={() => {
            refs.addCustomerModalRef.current?.openModal();
          }}
        >
          新增客户
        </Button>
      </TXSearchItemWrapper>
      <TXSearchItemWrapper
        name="phoneNumber"
        label="客户电话"
        className="flex gap-4"
      >
        <Form.Item name="phoneNumber" label="客户电话">
          <Input placeholder="请输入客户电话" />
        </Form.Item>
        <Button
          type={"primary"}
          className="mr-6"
          onClick={() => {
            logic.checkCustomerPeek("phoneNumber");
          }}
        >
          查重
        </Button>
      </TXSearchItemWrapper>
      <TXSearchItemWrapper
        name="wechatNumber"
        label="客户微信"
        className="flex gap-4"
      >
        <Form.Item name="wechatNumber" label="客户微信">
          <Input
            placeholder="请输入客户微信"
            onChange={(e) => {
              refs.form.setFieldValue(
                "wechatNumber",
                e.target?.value?.toLowerCase?.()
              );
            }}
          />
        </Form.Item>
        <Button
          type={"primary"}
          className="mr-6"
          onClick={() => {
            logic.checkCustomerPeek("wechatNumber");
          }}
        >
          查重
        </Button>
      </TXSearchItemWrapper>
      <Form.Item name="customerName" label="客户姓名">
        <Input placeholder="请输入客户姓名" />
      </Form.Item>

      <Form.Item name="areaCode" label="城市">
        <TXTreeSelect
          treeData={logic.reginTree}
          treeExpandAction={undefined}
          treeCheckable={false}
          placeholder="请选择城市"
          treeNodeFilterProp="title"
        />
      </Form.Item>

      <Form.Item name="channelIdList" label="渠道">
        <TXSearchSelect
          mode="multiple"
          {...channelProps}
          placeholder="请选择渠道"
        />
      </Form.Item>

      <Form.Item name="platformIdList" label="平台">
        <TXSearchSelect
          mode="multiple"
          {...platFormProps}
          placeholder="请选择平台"
        />
      </Form.Item>

      <Form.Item name="liveStreamerIdList" label="主播">
        <TXSearchSelect
          mode="multiple"
          {...streamerProps}
          placeholder="请选择主播"
        />
      </Form.Item>

      <Form.Item name="createTime" label="客户创建时间">
        <DatePicker.RangePicker />
      </Form.Item>

      <Form.Item name="assignTime" label="客户指派时间">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item name="assignedFlag" label="是否指派">
        <Select
          allowClear
          placeholder="请选择指派状态"
          options={[
            {
              label: "已指派",
              value: true,
            },
            {
              label: "未指派",
              value: false,
            },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
