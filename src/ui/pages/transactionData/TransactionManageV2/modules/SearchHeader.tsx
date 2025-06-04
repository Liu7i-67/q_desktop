import { TXButton } from "@/components/TXButton";
import TXEmployeePicker, {
  maxTagPlaceholder,
} from "@/components/TXEmployeePicker";
import TXSearchForm from "@/components/TXSearchForm";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { observer } from "@quarkunlimit/qu-mobx";
import { DatePicker, Form, Input, Select, Tag, Upload } from "antd";
import { DealManagementAuthV2 } from "../auth";
import { useStore } from "../store/RootStore";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  const orgProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/organization/get-page",
    request: {},
    searchParamKey: "orgName",
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.orgName,
        value: item.id,
        cooperationStatus: item.cooperationStatus,
        enableFlag: item.enableFlag,
      })),
  });

  return (
    <TXSearchForm
      form={refs.form}
      onReset={logic.onReset}
      onSearch={logic.onSearch}
      loading={computed.loading}
    >
      <Form.Item>
        {DealManagementAuthV2.dealManagementExport && (
          <TXButton
            type="primary"
            onClick={logic.onExport}
            loading={computed.loading || computed.exportLoading}
          >
            导出excel
          </TXButton>
        )}
        {DealManagementAuthV2.dealManagementUpload && (
          <Upload
            name="file"
            showUploadList={false}
            customRequest={logic.onUpload}
            accept=".xlsx,.xls"
          >
            <TXButton
              type="primary"
              className="ml-4"
              loading={computed.loading || computed.uploadLoading}
            >
              上传更新
            </TXButton>
          </Upload>
        )}
      </Form.Item>
      <Form.Item name="phoneNumber" label="客户电话">
        <Input placeholder="请输入客户电话" />
      </Form.Item>
      <Form.Item name="wechatNumber" label="客户微信">
        <Input placeholder="请输入客户微信" />
      </Form.Item>
      <Form.Item label="提交员工" name="createUserIdList">
        <TXEmployeePicker
          multiple
          placeholder="请选择提交员工"
          className="!w-[300px]"
        />
      </Form.Item>
      <Form.Item label="成交机构" name="orgIdList">
        <TXSearchSelect
          {...orgProps}
          placeholder="请选择成交机构"
          mode="multiple"
          maxTagCount={1}
          maxTagTextLength={5}
          maxTagPlaceholder={maxTagPlaceholder}
          optionRender={(option) => {
            return (
              <div>
                {option.data.label}
                <div className="flex">
                  {option.data.enableFlag === false && (
                    <Tag color="red">未启用</Tag>
                  )}
                  {option.data.cooperationStatus !== "IN_PROGRESS" && (
                    <Tag color="red">已暂停</Tag>
                  )}
                </div>
              </div>
            );
          }}
        />
      </Form.Item>
      <Form.Item name="confirmTime" label="成交时间">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始时间", "结束时间"]}
        />
      </Form.Item>
      <Form.Item name="createTime" label="上报时间">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始时间", "结束时间"]}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item name="dealStatus" label="成交状态">
        <Select
          placeholder="请选择成交状态"
          options={[
            { value: "UN_CONFIRMED", label: "待确认" },
            { value: "CONFIRMED", label: "已确认" },
            { value: "CANCELED", label: "已作废" },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
