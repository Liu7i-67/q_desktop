import { handleCopy } from "@/utils/tools";
import { Button, Form, Input, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Modal } from "@/components/TXModal";
import { useMemo } from "react";
import { CustomerStatus, WechatStatus } from "../service";
import { useSelector } from "../store";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const MergeCustomerModal = () => {
  const {
    mergeCustomerModalVisible,
    mergeCustomerTableData,
    regionTree,
    mergeCustomerSelectedRowKeys,
  } = useSelector((x) => x.state);
  const {
    closeMergeCustomerModal,
    handleConfirmMergCustomer,
    handleMergeCustomerSelectChange,
    handleSearchMergeCustomer,
    handleResetSearchMergeCustomer,
  } = useSelector((x) => x.logic);
  const { runGetSearchMergeCustomerData, runMergeCustomer } = useSelector(
    (x) => x.api
  );
  const mergeCustomerForm = useSelector((x) => x.mergeCustomerForm);

  const mergeColumns = useMemo(
    () => [
      {
        title: "客户归属人",
        dataIndex: "ownerName",
        key: "ownerName",
        width: 120,
      },
      {
        title: "创建/报备时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "客户微信",
        dataIndex: "wechatNumber",
        key: "wechatNumber",
        width: 100,
        render: (wechatNumber: string[]) => {
          return wechatNumber.map((wechat) => {
            return (
              <p
                className={"hover:underline hover:cursor-pointer"}
                onClick={() => {
                  handleCopy(wechat);
                }}
              >
                {wechat || "-"}
              </p>
            );
          });
        },
      },
      {
        title: "客户电话",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        render: (phoneNumbers: string[]) => (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {phoneNumbers?.map((phone, index) => (
              <span
                className={"hover:underline hover:cursor-pointer"}
                onClick={() => {
                  handleCopy(phone);
                }}
                key={index}
              >
                {phone}
              </span>
            ))}
          </div>
        ),
      },
      {
        title: "微信通过状态",
        dataIndex: "wechatStatus",
        key: "wechatStatus",
        render: (status: WechatStatus) => {
          const statusMap: { [key: string]: React.ReactNode } = {
            [WechatStatus.UN_PASSED]: <Tag color="error">未通过</Tag>,
            [WechatStatus.PASSED]: <Tag color="success">已通过</Tag>,
            [WechatStatus.UN_DEFINED]: <Tag color="cyan">待定中</Tag>,
          };
          return statusMap[status] || <Tag color="cyan">待定中</Tag>;
        },
      },
      {
        title: "客户状态",
        dataIndex: "customerStatus",
        key: "customerStatus",
        render: (status: CustomerStatus) => {
          const statusMap: { [key: string]: React.ReactNode } = {
            [CustomerStatus.EMPTY]: "-",
            [CustomerStatus.IN_PROGRESS]: <Tag color="processing">开发中</Tag>,
            [CustomerStatus.DEAL]: <Tag color="success">成交</Tag>,
            [CustomerStatus.REPEAT_PURCHASE]: <Tag color="blue">复购</Tag>,
          };
          return statusMap[status] || status;
        },
      },
    ],
    [regionTree]
  );

  const rowSelection: TableRowSelection<any> = {
    type: "radio",
    selectedRowKeys: [...mergeCustomerSelectedRowKeys],
    onChange: handleMergeCustomerSelectChange,
  };

  return (
    <Modal
      title="客户合并"
      open={mergeCustomerModalVisible}
      onCancel={closeMergeCustomerModal}
      onOk={handleConfirmMergCustomer}
      okButtonProps={{
        loading: runMergeCustomer.loading,
      }}
      width={1000}
    >
      <Form
        className={"mb-4"}
        layout="inline"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
        form={mergeCustomerForm}
      >
        <Form.Item label="客户微信" name="wechatNumber">
          <Input
            placeholder="请输入微信查询客户"
            onChange={(e) => {
              mergeCustomerForm.setFieldsValue({
                wechatNumber: e.target?.value?.toLocaleLowerCase?.(),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="客户电话" name="phoneNumber">
          <Input placeholder="请输入电话查询客户" />
        </Form.Item>
        <Form.Item>
          <Button className={"mr-4"} onClick={handleResetSearchMergeCustomer}>
            重置
          </Button>
          <Button type="primary" onClick={handleSearchMergeCustomer}>
            搜索
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={mergeCustomerTableData}
        loading={runGetSearchMergeCustomerData.loading}
        pagination={false}
        columns={mergeColumns}
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
      />
    </Modal>
  );
};

export default MergeCustomerModal;
