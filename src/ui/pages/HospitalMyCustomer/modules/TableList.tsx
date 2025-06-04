import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { IHospitalMyCustomer } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import UserHelper from "@/utils/user-helper";
import TXTable from "@/components/TXTable";
import {
  dispatchStatusInfo2,
  TDispatchStatus,
} from "@/service/business/v1/customer-dispatch/customer-dispatch-page";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { InstitutionalCustomerAuth } from "../auth";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<IHospitalMyCustomer>[] = [
    {
      title: "派单咨询师",
      dataIndex: "createUserName",
      key: "createUserName",
      width: 140,
      dataType: "list",
    },
    {
      title: "派单客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 130,
      dataType: "list",
    },
    {
      title: "派单客户城市",
      dataIndex: "areaCode",
      key: "areaCode",
      width: 160,
      dataType: "areaCode",
    },
    {
      title: "项目",
      dataIndex: "dataNames",
      key: "dataNames",
      width: 200,
      dataType: "tagStr",
    },
    {
      title: "当前状态",
      dataIndex: "dispatchStatus",
      key: "dispatchStatus",
      width: 100,
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: dispatchStatusInfo2,
        },
      },
    },
    {
      title: "历史是否派过",
      dataIndex: "historyDispatchInfoDTO",
      key: "historyDispatchInfoDTO",
      width: 160,
      render: (history: IHospitalMyCustomer["historyDispatchInfoDTO"]) => {
        let text = "未派过";

        if (history?.tenantName) {
          text = `${history.tenantName}派过`;
        }

        return <TXListRow className="w-[160px]" list={text} />;
      },
    },
    ...(UserHelper.getInstance().loginInfo?.userType !== "ORG"
      ? ([
          {
            title: "机构名称",
            dataIndex: "orgName",
            key: "orgName",
            width: 160,
            dataType: "list",
          },
        ] as ITXColumnType<IHospitalMyCustomer>[])
      : []),
    {
      title: "派单时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      dataType: "datetime",
    },
    {
      title: "派单留言",
      dataIndex: "memo",
      key: "memo",
      width: 200,
      dataType: "list",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      width: 140,
      fixed: "right",
      render: (_, record) => {
        // 【不重单】【重单】这两个状态时，就不让继续处理
        const hide = ["NO_REPEAT", "REPEAT"].includes(record.dispatchStatus);

        return (
          <TXTableAction
            className="w-[140px]"
            maxCount={2}
            onAction={(t) => logic.onAction(t, record)}
            actions={[
              {
                label: "派单处理",
                type: "DISPATCH",
                auth:
                  InstitutionalCustomerAuth.InstitutionalCustomerHandle &&
                  !hide,
              },
              {
                label: "机构处理历史",
                type: "HISTORY",
                auth: InstitutionalCustomerAuth.institutionalCustomerHandleHistory,
              },
              {
                label: "平台留言历史",
                type: "MESSAGE_HISTORY",
                auth: InstitutionalCustomerAuth.institutionalCustomerMessageHistory,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TXTable<IHospitalMyCustomer>
      columns={columns}
      tableKey="CUSTOMER_MANGE_HOSPITAL_MY_CUSTOMER"
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
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
