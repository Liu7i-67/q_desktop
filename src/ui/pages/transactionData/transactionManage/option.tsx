import TXEmployeePicker, {
  maxTagPlaceholder,
  useTXEmployeePicker,
} from "@/components/TXEmployeePicker";
import TXSearchForm from "@/components/TXSearchForm";
import TXSearchSelect from "@/components/TXSearchSelect";
import { useSearchSelectFetch } from "@/components/TXSearchSelect/hook";
import { DealManagementAuth } from "@/pages/transactionData/transactionManage/auth";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Upload,
} from "antd";
import { useState } from "react";
import { useSelector } from "./store";
const { RangePicker } = DatePicker;

const Option = () => {
  const form = useSelector((x) => x.form);
  const { exportLoading, uploadExcelLoading } = useSelector((x) => x.state);

  const { runGetData, runExportExcel } = useSelector((x) => x.api);
  const { onSearch, reset, exportExcel, getEmployeeList, handleUploadExcel } =
    useSelector((x) => x.logic);
  const [expand, setExpand] = useState(false);

  // useMount(() => {
  //   getEmployeeList();
  // });

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
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
    >
      {(DealManagementAuth.dealManagementExport ||
        DealManagementAuth.dealManagementUpload) && (
        <Form.Item>
          {DealManagementAuth.dealManagementExport && (
            <Button
              type="primary"
              onClick={() => exportExcel()}
              loading={exportLoading}
            >
              导出excel
            </Button>
          )}
          {DealManagementAuth.dealManagementUpload && (
            <Upload
              name="file"
              showUploadList={false}
              customRequest={(info: any) => {
                // 自定义上传 覆盖掉 upload 默认当前域名下访问静态资源 404 报错问题
                handleUploadExcel(info);
              }}
              accept=".xlsx,.xls"
            >
              <Button
                type="primary"
                className="ml-4"
                loading={uploadExcelLoading}
              >
                上传更新
              </Button>
            </Upload>
          )}
        </Form.Item>
      )}
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
        <RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始时间", "结束时间"]}
        />
      </Form.Item>
      <Form.Item name="createTime" label="上报时间">
        <RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始时间", "结束时间"]}
          allowClear={true}
          // onChange={(dates) => {
          //   if (dates) {
          //     form.setFieldsValue({
          //       dispatchTimeStart: dates[0]?.format('YYYY-MM-DD'),
          //       dispatchTimeEnd: dates[1]?.format('YYYY-MM-DD'),
          //     });
          //   } else {
          //     form.setFieldsValue({
          //       dispatchTimeStart: undefined,
          //       dispatchTimeEnd: undefined,
          //     });
          //   }
          // }}
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
};

export default Option;
