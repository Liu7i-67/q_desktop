import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TreeSelect,
  Divider,
  Tooltip,
} from "antd";
import TXSearchForm, { TXSearchItemWrapper } from "@/components/TXSearchForm";
import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import {
  getChannelTreeOptions,
  getOrgTreeOptions,
} from "@/utils/treeTransform";
import TXEmployeePicker from "@/components/TXEmployeePicker";
import UserHelper from "@/utils/user-helper";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import TransferOption from "./TransferOption";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TXButton } from "@/components/TXButton";
import { customerTypeOptions } from "@/utils/enum/modules/customerType";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;
  const roleIdList = UserHelper.getInstance().getUserRoleIdList;

  const channelTreeProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/channel/tree",
    transformTree: (data) => getChannelTreeOptions(data),
    request: {
      enableFlag: true,
    },
  });

  const dispatchOrgProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/region/tree-and-organization",
    transformTree: (data) => getOrgTreeOptions(data, true, false),
  });

  const labelRelationIdProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/sys-dict-value/dict-value",
    request: {
      dictCode: "customer_label",
    },
    searchParamKey: "dictName",
    transformOptions: (data) => {
      return data.map((x) => ({
        label: x.dictName,
        value: x.dictValue,
      }));
    },
  });
  useWhen(
    () => true,
    () => {
      logic.getRegionTree();
    }
  );
  return (
    <>
      <TXSearchForm
        onSearch={logic.onSearch}
        onReset={logic.onReset}
        formKey="CUSTOMER_MANAGE_MY_CUSTOMER"
        form={refs.searchForm}
        loading={computed.loadingList}
      >
        <TXSearchItemWrapper name="" label="" disabledSetting>
          <TXButton
            auth={MyCustomerAuth.customerCreate}
            type={"primary"}
            className="mr-6"
            onClick={() => refs.editRef.current?.openModal()}
          >
            新增客户
          </TXButton>
        </TXSearchItemWrapper>
        <Form.Item name="ids" label="客户id">
          <Input
            autoComplete="off"
            placeholder="请输入客户id"
            onChange={(e) => {
              refs.searchForm.setFieldValue(
                "ids",
                e.target.value.replace(/[^\d]/g, "")
              );
            }}
          />
        </Form.Item>
        <TXSearchItemWrapper
          name="phoneNumber"
          label="客户电话"
          className="flex gap-4"
        >
          <Form.Item name="phoneNumber" label="客户电话">
            <Input placeholder="请输入客户电话" />
          </Form.Item>

          <Button
            type="primary"
            onClick={() => logic.getRepeatUser("phoneNumber")}
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
                refs.searchForm.setFieldValue(
                  "wechatNumber",
                  e.target?.value?.toLowerCase?.()
                );
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            onClick={() => logic.getRepeatUser("wechatNumber")}
          >
            查重
          </Button>
        </TXSearchItemWrapper>
        <Form.Item
          name="mineCustomerFlag"
          label="仅查看我的客户"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item label="客户姓名" name="customerName">
          <Input placeholder="请输入客户姓名" />
        </Form.Item>
        <Form.Item label="所在城市" name="areaCode">
          <TreeSelect
            showSearch
            style={{ width: 240 }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择城市"
            allowClear
            treeData={logic.regionTree}
          />
        </Form.Item>
        <Form.Item name="wechatStatus" label="微信通过状态">
          <Select
            placeholder="请选择微信通过状态"
            options={[
              { value: "UN_PASSED", label: "未通过" },
              { value: "PASSED", label: "已通过" },
              { value: "UN_DEFINED", label: "待定中" },
            ]}
          />
        </Form.Item>
        <Form.Item name="ownerUserId" label="客户所属人">
          <TXEmployeePicker className="!w-[300px]" />
        </Form.Item>
        <Form.Item name="customerStatus" label="客户状态">
          <Select
            placeholder="请选择客户状态"
            allowClear
            showSearch
            optionFilterProp="children"
            defaultActiveFirstOption={false}
            options={[
              {
                label: "空",
                value: "EMPTY",
              },
              {
                label: "开发中",
                value: "IN_PROGRESS",
              },
              {
                label: "成交",
                value: "DEAL",
              },
              {
                label: "复购",
                value: "REPEAT_PURCHASE",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="customerTypes" label="客户类型">
          <Select
            placeholder="请选择客户类型"
            options={customerTypeOptions}
            mode="multiple"
            allowClear
            maxTagCount={1}
            maxTagTextLength={5}
          />
        </Form.Item>
        {["351060867091005479", "1658036792173137901"].findIndex((id) =>
          roleIdList.includes(id)
        ) < 0 && (
          <Form.Item name="channelIdList" label="来源渠道">
            <TXTreeSelect
              multiple
              placeholder="请选择来源渠道"
              {...channelTreeProps}
            />
          </Form.Item>
        )}
        <Form.Item name="intentionalDataIdList" label="首次咨询项目">
          <Select
            placeholder="请选择首次咨询项目"
            mode="multiple"
            options={logic.firstConsultTree}
          />
        </Form.Item>
        <Form.Item name="createTime" label="建档时间">
          <DatePicker.RangePicker />
        </Form.Item>
        <TXSearchItemWrapper name="onlyCollabType" label="协作类型">
          <Form.Item name="onlyCollabType" label="">
            <Radio.Group>
              <Radio value="OFFICIAL">
                官方协作客户
                <Tooltip title="在我的可见范围内的客户中查找具有官方协作关系的客户">
                  <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </Radio>
              <Radio value="COLLABORATION">
                协作合作客户
                <Tooltip title="在我的可见范围内的客户中 查找具有协作协作关系的客户（协作人数>1）">
                  <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </TXSearchItemWrapper>
        <Form.Item name="dealDate" label="客户成交时间范围">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="dispatchOrgIdList" label="派单机构">
          <TXTreeSelect
            multiple
            placeholder="请选择派单机构"
            {...dispatchOrgProps}
          />
        </Form.Item>
        <Form.Item name="labelRelationLabelValue" label="客户标签">
          <TXSearchSelect
            {...labelRelationIdProps}
            labelInValue
            placeholder="客户标签"
            mode="multiple"
          />
        </Form.Item>
      </TXSearchForm>
      <Divider className={"py-0 my-0 mb-2"} />
      <TransferOption />
    </>
  );
});
