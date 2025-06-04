import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, InputNumber, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IResBusinessV1CustomerCollabDetail } from "@/service/business/v1/customer-collab/detail";
import { DeleteOutlined } from "@ant-design/icons";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const collabTypes = [
    {
      label: "官方合作",
      value: "OFFICIAL",
    },
    {
      label: "协作合作",
      value: "COLLABORATION",
      disabled: !!logic.initData?.justAdd,
    },
  ];

  const columns: ColumnsType<IResBusinessV1CustomerCollabDetail> = [
    {
      title: "合作类型",
      dataIndex: "collabType",
      key: "collabType",
      render: (_, record) => (
        <Observer>
          {() => (
            <Select
              style={{ width: "100%" }}
              value={record.collabType}
              disabled={record.leaderFlag || computed.disabledEdit(record)}
              onChange={(value) => {
                logic.changeRecordCollabType(record, value);
              }}
              options={collabTypes}
            ></Select>
          )}
        </Observer>
      ),
      width: "30%",
    },
    {
      title: "合作比率(%)",
      dataIndex: "ratio",
      key: "ratio",
      render: (_, record) => (
        <Observer>
          {() => (
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={100}
              precision={0}
              disabled={computed.disabledEdit(record)}
              value={record.ratio}
              onChange={(value) => {
                logic.changeRecordRatio(record, value || 0);
              }}
            />
          )}
        </Observer>
      ),
      width: "20%",
    },
    {
      title: "合作用户",
      dataIndex: "userId",
      key: "userId",
      render: (_, record, index: number) => (
        <Observer>
          {() => {
            return (
              <TXSearchUserSelect
                labelInValue
                disabled={record.leaderFlag || computed.disabledEdit(record)}
                value={
                  record.userId
                    ? { label: record.userName, value: record.userId }
                    : null
                }
                placeholder="请输入搜索关键词"
                onChange={(v) => {
                  logic.changeRecordUser(record, v);
                }}
                style={{
                  width: "100%",
                }}
              />
            );
          }}
        </Observer>
      ),
      width: "40%",
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <Observer>
            {() => {
              if (record.leaderFlag) {
                return null;
              }
              if (computed.disabledEdit(record)) {
                return null;
              }

              return (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => logic.handleDelete(record)}
                />
              );
            }}
          </Observer>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={logic.collabs}
      columns={columns}
      pagination={false}
      loading={computed.loading}
      rowKey="id"
    />
  );
});
