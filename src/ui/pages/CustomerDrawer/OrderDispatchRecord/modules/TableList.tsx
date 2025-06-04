import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tag } from "antd";
import { IPagination } from "@/utils/interface";
import { IOrderDispatchRecord } from "../interface";
import {
  dispatchStatusInfo,
  TDispatchStatus,
} from "@/service/business/v1/customer-dispatch/customer-dispatch-page";
import TXTable from "@/components/TXTable";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";
import { MyCustomerAuth } from "@/pages/customerManage/MyCustomerV2/auth";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<IOrderDispatchRecord>[] = [
    {
      title: "创建/报备时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 180,
    },
    {
      title: "派单状态",
      dataIndex: "dispatchStatus",
      key: "dispatchStatus",
      width: 100,
      render: (status: TDispatchStatus) => {
        const item = dispatchStatusInfo[status || "EMPTY"];
        return <Tag color={item?.color}>{item?.text}</Tag>;
      },
    },
    {
      title: "派单机构",
      dataIndex: "orgName",
      key: "orgName",
      width: 150,
    },
    {
      title: "派单项目",
      dataIndex: "dataNames",
      key: "dataNames",
      width: 240,
      dataType: "tagStr",
    },
    {
      title: "派单号码",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 120,
    },
    {
      title: "派单留言",
      dataIndex: "memo",
      key: "memo",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      fixed: "right",
      render: (text: string, record) => {
        return (
          <Observer>
            {() => {
              return (
                <TXTableAction
                  className="w-[160px]"
                  onAction={(action) => logic.recordAction(record, action)}
                  actions={[
                    {
                      type: "MESSAGE",
                      label: "留言",
                      auth: true,
                    },
                    {
                      type: "EDIT",
                      label: "修改状态",
                      auth: true,
                    },
                    {
                      type: "FEEDBACK",
                      label: "机构反馈",
                      auth: true,
                    },
                    {
                      type: "DEAL",
                      label: "成交",
                      disabled: computed.isInvalid,
                      auth: true,
                      disabledTips: "无效客户不支持成交",
                    },
                    {
                      type: "DELETE",
                      label: "删除",
                      auth: MyCustomerAuth.customerDispatchDelete,
                    },
                  ]}
                />
              );
            }}
          </Observer>
        );
      },
    },
  ];

  return (
    <TXTable<IOrderDispatchRecord>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="MY_CUSTOMER_ORDER_DISPATCH_RECORD"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 300px)",
      }}
    />
  );
});
