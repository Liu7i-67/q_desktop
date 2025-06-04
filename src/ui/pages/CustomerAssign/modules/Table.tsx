import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { IPagination } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { CustomerAssiginAuth } from "../auth";
import { useStore } from "../store/RootStore";

export const Table = observer(function Table_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  const columns: ITXColumnType<IResBusinessV1CustomerGetPage>[] = [
    {
      title: "渠道",
      dataIndex: "channelStr",
      key: "channelStr",
      width: 180,
      dataType: "text",
    },
    {
      title: "客户ID",
      dataIndex: "id",
      key: "id",
      width: 140,
      dataType: "text",
    },
    {
      title: "客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 120,
      dataType: "list",
    },
    {
      title: "客户微信",
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      width: 140,
      dataType: "list",
    },
    {
      title: "客户姓名",
      dataIndex: "customerName",
      key: "customerName",
      width: 140,
      dataType: "text",
    },
    {
      title: "城市",
      dataIndex: "cityStr",
      key: "cityStr",
      width: 80,
    },
    {
      title: "是否指派",
      dataIndex: "assignedFlag",
      key: "assignedFlag",
      width: 150,
      render: (text, record) => {
        return (
          <span className={!record.ownerUserId ? "text-red-500" : ""}>
            {record.ownerUserId ? "已指派" : "未指派"}
          </span>
        );
      },
    },
    {
      title: "所属咨询师",
      dataIndex: "ownerName",
      key: "ownerName",
      width: 150,
    },
    {
      title: "客户创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
    },
    {
      title: "客户指派时间",
      dataIndex: "assignTime",
      key: "assignTime",
      width: 160,
    },
    {
      title: "客户类型",
      dataIndex: "customerTypeStr",
      key: "customerTypeStr",
      width: 80,
    },
    {
      title: "客户状态",
      dataIndex: "customerStatus",
      key: "customerStatus",
      width: 80,
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: {
            EMPTY: { color: "default", text: "-" },
            IN_PROGRESS: { color: "processing", text: "开发中" },
            DEAL: { color: "success", text: "成交" },
            REPEAT_PURCHASE: { color: "blue", text: "复购" },
          },
        },
      },
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 120,
      render: (text, record) => (
        <TXTableAction
          className="w-[120px]"
          actions={[
            {
              label: "指派",
              auth:
                CustomerAssiginAuth.customerAssignTaskAssign &&
                !Boolean(record.ownerUserId),
              onClick() {
                refs.assignModalRef.current?.openModal(record);
              },
            },
            {
              label: "编辑",
              type: "EDIT",
              auth: CustomerAssiginAuth.customerAssignUpdate,
              onClick() {
                refs.editCustomerModalRef.current?.openModal(record);
              },
            },
            {
              label: "转移客户",
              auth:
                CustomerAssiginAuth.customerAssignTransfer &&
                Boolean(record.ownerUserId),
              onClick() {
                refs.transferRef.current?.openModal({
                  targetCustomerIds: [record.id],
                });
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <TXTable<IResBusinessV1CustomerGetPage>
      dataSource={logic.dataSource}
      loading={computed.loading}
      tableKey="CUSTOMER_ASSIGN"
      scroll={{
        x: "max-content",
        y: "calc(100vh - 300px)",
      }}
      rowKey="id"
      columns={columns as any}
      onChange={(p) => logic.onChangePageSize(p as IPagination)}
      pagination={{
        ...logic.pagination,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
    />
  );
});
