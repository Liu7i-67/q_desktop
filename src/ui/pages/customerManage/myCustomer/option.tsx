import TXEmployeePicker, {
  useTXEmployeePicker,
} from "@/components/TXEmployeePicker";
import TXSearchForm from "@/components/TXSearchForm";

import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import {
  getChannelTreeOptions,
  getOrgTreeOptions,
  transformTreeData,
} from "@/utils/treeTransform";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TreeSelect,
  Tooltip,
} from "antd";
import { useEffect } from "react";
import { CustomerStatusMap } from "./service";
import { useSelector } from "./store";
import TransferOption from "./transferOption";
import { RepeatModal } from "./RepeatModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import UserHelper from "@/utils/user-helper";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { customerTypeOptions } from "@/utils/enum/modules/customerType";

const userHelper = UserHelper.getInstance();

const roleIdList = userHelper.getUserRoleIdList;

const Option = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { regionTree, projectTypeTree } = useSelector((x) => x.state);
  const {
    openEditModal,
    openEditModalCreate,
    reset,
    onSearch,
    getRepeatUser,
    getProjectTypeTree,
  } = useSelector((x) => x.logic);
  const form = useSelector((x) => x.form);
  const dispatchOrgProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/region/tree-and-organization",
    transformTree: (data) => getOrgTreeOptions(data, true, false),
  });

  const channelTreeProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/channel/tree",
    transformTree: (data) => getChannelTreeOptions(data),
    request: {
      enableFlag: true,
    },
  });

  const labelRelationIdProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/sys-dict-value/dict-value",
    request: {
      dictCode: "customer_label",
    },
    searchParamKey: "labelRelationLabelValue",
    transformOptions: (data) => {
      return data.map((x) => ({
        label: x.dictName,
        value: x.dictValue,
      }));
    },
  });

  useEffect(() => {
    getProjectTypeTree();
  }, []);

  return (
    <>
      <TXSearchForm
        form={form}
        onReset={reset}
        onSearch={onSearch}
        loading={runGetData.loading}
      >
        {MyCustomerAuth.customerCreate && (
          <Button
            type={"primary"}
            className="mr-6"
            onClick={() => {
              openEditModal();
              openEditModalCreate();
            }}
          >
            新增客户
          </Button>
        )}
        <Form.Item name="ids" label="客户id">
          <Input
            autoComplete="off"
            placeholder="请输入客户id"
            onChange={(e) => {
              form.setFieldValue("ids", e.target.value.replace(/[^\d]/g, ""));
            }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item name="phoneNumber" label="客户电话">
              <Input placeholder="请输入客户电话" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={() => getRepeatUser("phoneNumber")}>
              查重
            </Button>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item name="wechatNumber" label="客户微信">
              <Input
                placeholder="请输入客户微信"
                onChange={(e) => {
                  form.setFieldValue(
                    "wechatNumber",
                    e.target?.value?.toLocaleLowerCase?.()
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => getRepeatUser("wechatNumber")}
            >
              查重
            </Button>
          </Col>
        </Row>
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
            style={{ width: "240px" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择城市"
            allowClear
            treeData={transformTreeData(regionTree)}
            filterTreeNode={(inputValue, node) =>
              (node.title as string)
                .toLowerCase()
                .indexOf(inputValue.toLowerCase()) > -1
            }
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
            options={Object.keys(CustomerStatusMap).map((key: any) => ({
              // @ts-ignore
              label: CustomerStatusMap[key],
              value: key,
            }))}
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
            showSearch
            options={projectTypeTree?.reduce((prev, item) => {
              const firstLevelNode: any = {};
              firstLevelNode["value"] = item.id;
              if (item.typeName === "其他") {
                firstLevelNode["label"] = "其他（看脸、避雷、查医院等）";
              } else {
                firstLevelNode["label"] = item.typeName;
              }
              return item.typeName !== "皮肤"
                ? item.typeName === "轻医美"
                  ? [firstLevelNode, ...prev]
                  : [...prev, firstLevelNode]
                : prev;
            }, [])}
          />
        </Form.Item>
        <Form.Item name="createTime" label="建档时间">
          <DatePicker.RangePicker />
        </Form.Item>
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
      <RepeatModal />
    </>
  );
};

export default Option;
