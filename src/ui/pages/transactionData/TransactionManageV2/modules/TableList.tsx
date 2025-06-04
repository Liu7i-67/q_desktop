import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { dealStatusInfo } from "@/service/business/v1/customer-deal/get-page";
import { customerStatusInfo } from "@/service/business/v1/customer-follow/get-page";
import { IPagination } from "@/utils/interface";
import { formatCurrency } from "@/utils/tools";
import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { DealManagementAuthV2 } from "../auth";
import { ITransactionManageV2 } from "../interface";
import { useStore } from "../store/RootStore";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<ITransactionManageV2>[] = [
    {
      title: "成交状态",
      dataIndex: "dealStatus",
      key: "dealStatus",
      width: 90,
      fixed: "left",
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: dealStatusInfo,
          props: {
            bordered: false,
          },
        },
      },
    },
    {
      title: "提交员工",
      dataIndex: "createUserName",
      key: "createUserName",
      width: 130,
      fixed: "left",
    },
    {
      title: "客户来源",
      dataIndex: "channelName",
      key: "channelName",
      width: 100,
      dataType: "text",
    },
    {
      title: "客户名称",
      dataIndex: "customerName",
      key: "customerName",
      width: 100,
      dataType: "text",
    },
    {
      title: "客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 130,
      dataType: "list",
    },
    {
      title: "客户微信",
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      width: 120,
      dataType: "list",
    },
    {
      title: "成交机构",
      dataIndex: "orgName",
      key: "orgName",
      width: 120,
      dataType: "text",
    },
    {
      title: "成交项目",
      dataIndex: "dataNames",
      key: "dataNames",
      width: 140,
      dataType: "tagStr",
    },
    {
      title: "成交金额",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (text: string) => formatCurrency(text) || "-",
    },
    {
      title: "确认金额",
      dataIndex: "confirmAmount",
      key: "confirmAmount",
      width: 120,
      render: (text: string) => formatCurrency(text),
    },
    {
      title: "财务备注",
      dataIndex: "operateMemo",
      key: "operateMemo",
      width: 150,
      ellipsis: true,
      dataType: "text",
    },
    {
      title: "客户状态",
      dataIndex: "customerStatus",
      key: "customerStatus",
      width: 90,
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: customerStatusInfo,
          props: {
            bordered: false,
          },
        },
      },
    },
    {
      title: "客户报备时间",
      dataIndex: "customerCreateTime",
      key: "customerCreateTime",
      width: 160,
      dataType: "datetime",
    },
    {
      title: "成交时间",
      dataIndex: "dealDate",
      key: "dealDate",
      width: 120,
      dataType: "date",
    },
    {
      title: "上报时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      dataType: "datetime",
    },
    {
      title: "确认时间",
      dataIndex: "confirmDate",
      key: "confirmDate",
      width: 160,
      dataType: "datetime",
    },
    {
      title: "成交周期",
      dataIndex: "dealCycle",
      key: "dealCycle",
      width: 90,
      fixed: "right",
      render: (text: string) => text + "天" || "-",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[150px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    label: "详情",
                    type: "DETAIL",
                    auth: record.dealStatus !== "UN_CONFIRMED",
                  },
                  {
                    label: "确认",
                    type: "CONFIRM",
                    auth:
                      record.dealStatus === "UN_CONFIRMED" &&
                      DealManagementAuthV2.dealManagementConfirm,
                  },
                  {
                    label: "作废",
                    type: "CANNEL",
                    auth:
                      record.dealStatus === "UN_CONFIRMED" &&
                      DealManagementAuthV2.dealManagementCancel,
                  },
                  {
                    label: "删除",
                    type: "DELETE",
                    auth:
                      record.dealStatus !== "CONFIRMED" &&
                      DealManagementAuthV2.dealManagementDelete,
                  },
                ]}
              />
            );
          }}
        </Observer>
      ),
    },
  ];

  return (
    <TXTable<ITransactionManageV2>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="TRANSACTIONDATA_TRANSACTIONMANAGE"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
