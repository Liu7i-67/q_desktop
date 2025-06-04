import { CustomerStatus } from "@/pages/customerManage/myCustomer/service";
import { IPagination } from "@/utils/interface";
import { cn } from "@/utils/tools";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Tag, Tooltip } from "antd";
import { useRef } from "react";
import FollowUpModal, { IFollowUpModalRef } from "../../FollowUpModal";
import { ICustomerFollowRecordWeb } from "../interface";
import { useStore } from "../store/RootStore";
import TXTable from "@/components/TXTable";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { ITXColumnType } from "@/components/TXTable/interface";

const TipsDom = (
  <Tooltip title="该客户存在跨门店【派单】或【成交】记录，请在老系统或联系技术人员查看历史数据。">
    <div
      className={cn(
        "text-white font-bold mr-1",
        "flex justify-center items-center",
        "w-[16px] h-[16px] rounded-[50%] cursor-pointer",
        "bg-gradient-to-b from-yellow-500 to-yellow-400"
      )}
    >
      ?
    </div>
  </Tooltip>
);

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;
  const followUpModalRef = useRef<IFollowUpModalRef>(null);

  const columns: ITXColumnType<ICustomerFollowRecordWeb>[] = [
    {
      title: "客户归属人",
      dataIndex: "ownerName",
      key: "ownerName",
      width: 160,
      fixed: "left",
      render: (_, record) => {
        const { ownerName } = record?.customerDTO || {};

        const list = [
          record.hasCrossStoreRecord ? TipsDom : "",
          ownerName ? ownerName : "-",
        ];

        return (
          <TXListRow className="w-[160px]" separator={false} list={list} />
        );
      },
    },
    {
      title: "协作人",
      width: 120,
      key: "xzr",
      fixed: "left",
      render: (_, record) => {
        const { ownerUserId } = record;
        const nameList: string[] = [];
        record?.customerDTO?.collabDTOList?.map((info: any) => {
          const { userId, userName } = info;
          if (userId !== ownerUserId) {
            nameList.push(userName);
          }
        });
        return <TXListRow className="w-[120px]" list={nameList} />;
      },
    },
    {
      title: "建档时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 140,
      fixed: "left",
      dataType: "datetime",
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
      title: "客户状态",
      dataIndex: "customerStatus",
      key: "customerStatus",
      width: 100,
      render: (_, record) => {
        const { customerStatus } = record?.customerDTO || {};
        const statusMap: { [key: string]: React.ReactNode } = {
          [CustomerStatus.EMPTY]: "-",
          [CustomerStatus.IN_PROGRESS]: <Tag color="processing">开发中</Tag>,
          [CustomerStatus.DEAL]: <Tag color="success">成交</Tag>,
          [CustomerStatus.REPEAT_PURCHASE]: <Tag color="blue">复购</Tag>,
        };
        return statusMap[customerStatus] || customerStatus;
      },
    },
    {
      title: "上次跟进内容",
      dataIndex: "lastMemo",
      key: "lastMemo",
      width: 120,
      fixed: "right",
      dataType: "text",
      dataExtraProps: {
        text: {
          row: 2,
        },
      },
    },
    {
      title: "上次跟进时间",
      dataIndex: "lastCreateTime",
      key: "lastCreateTime",
      width: 140,
      fixed: "right",
      dataType: "datetime",
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <>
          <Tooltip
            trigger={"hover"}
            title={record?.customerDTO ? "" : "当前客户归属已不是您"}
          >
            <Button
              type="link"
              size="small"
              onClick={() => {
                followUpModalRef.current?.openModal(record);
              }}
              disabled={!record?.customerDTO}
            >
              跟进
            </Button>
          </Tooltip>

          <Button
            type="link"
            size="small"
            onClick={() => {
              refs.customerRef.current?.openDrawer({
                customerId: record.customerId,
              });
            }}
            disabled={!record?.customerDTO}
          >
            详情
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <TXTable
        dataSource={logic.dataSource}
        loading={computed.loading}
        scroll={{
          x: "max-content",
          y: "calc(100vh - 360px)",
        }}
        rowKey="id"
        columns={columns}
        tableKey="FOLLOW_UP_TODAY"
        onChange={(p) => logic.onPageChange(p as IPagination)}
        pagination={{
          ...logic.pagination,
          showSizeChanger: true,
          showTotal: (t) => `共${t}条`,
        }}
      />
      <FollowUpModal
        ref={followUpModalRef}
        onSuccess={logic.getCustomerFollowPage}
      />
    </>
  );
});
