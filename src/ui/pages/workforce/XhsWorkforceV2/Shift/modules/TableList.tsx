import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, TableColumnsType, Tag, Popconfirm, Space } from "antd";
import TXTable from "@/components/TXTable";
import { IResBaseV1WorkingShiftGetList } from "@/service/base/v1/working-shift/get-list";
import { TXTag } from "@/components/TXTag";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1WorkingShiftGetList> = [
    {
      title: "班次名称",
      dataIndex: "shiftName",
      key: "shiftName",
      width: 120,
      render: (text, record) => {
        return (
          <TXTag text={text} color={record.frontendExtension || undefined} />
        );
      },
    },
    {
      title: "排班类型",
      dataIndex: "scheduleType",
      key: "scheduleType",
      width: 120,
      render: () => "小红书排班",
    },
    {
      title: "时间段",
      dataIndex: "timeSlot",
      key: "timeSlot",
      width: 180,
      render: (_, record) => (
        <>
          <Tag>{record.startTime}</Tag>
          <span className="mr-2">-</span>
          <Tag>{record.endTime}</Tag>
        </>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 180,
    },
    {
      title: "最后修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 180,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          {RedBookSchedulingAuth.redBookSchedulingShiftUpdate && (
            <Button
              type="link"
              size="small"
              onClick={() => refs.editRef.current?.openModal(record)}
            >
              编辑
            </Button>
          )}
          {RedBookSchedulingAuth.redBookSchedulingShiftDelete && (
            <Popconfirm
              title="确定要删除这个班次吗？"
              onConfirm={() => logic.deleteShift(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                size="small"
                danger
                loading={computed.deleteLoading}
              >
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <TXTable<IResBaseV1WorkingShiftGetList>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={false}
      rowKey="id"
      tableKey="SHIFT_MANAGEMENT"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
