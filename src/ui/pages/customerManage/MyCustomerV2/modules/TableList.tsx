import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { IPagination } from "@/utils/interface";
import { Button, Dropdown, Tag, Tooltip, TableColumnsType } from "antd";
import {
  cn,
  handleCopy,
  handleJudgeCustomerIdSmallThanTwoH,
} from "@/utils/tools";
import { WechatStatus, CustomerStatus } from "../interface";
import { MyCustomerAuth } from "../auth";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { ICollabListDTO } from "@/service/business/v1/customer/get-page";
import { AddressHelper } from "@/utils/address-helper";
import TXTable from "@/components/TXTable";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { TXButton } from "@/components/TXButton";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: ITXColumnType<IResBusinessV1CustomerGetPage>[] = [
    {
      width: 40,
      fixed: "left",
      key: "flag",
      disabledSetting: true,
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const flag = handleJudgeCustomerIdSmallThanTwoH(record.id);
        return flag ? (
          <Tooltip title="该客户存在跨门店【派单】或【成交】记录，请在老系统或联系技术人员查看历史数据。">
            <div
              className={cn(
                "text-white font-bold",
                "flex justify-center items-center",
                "w-[16px] h-[16px] rounded-[50%] cursor-pointer",
                "bg-gradient-to-b from-yellow-500 to-yellow-400"
              )}
            >
              ?
            </div>
          </Tooltip>
        ) : (
          ""
        );
      },
    },
    {
      title: "归属人",
      dataIndex: "ownerName",
      key: "ownerName",
      width: 120,
      fixed: "left",
      render: (text: string) => {
        return <p className={"w-[120px] text-nowrap wes"}>{text}</p>;
      },
    },
    {
      title: "协作人",
      width: 80,
      key: "xzr",
      fixed: "left",
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const { collabDTOList, ownerUserId } = record;
        const nameList: string[] = [];
        collabDTOList?.map((info: ICollabListDTO) => {
          const { userId, userName } = info;
          if (userId !== ownerUserId) {
            nameList.push(userName);
          }
        });
        return <TXListRow className="w-[80px]" list={nameList} />;
      },
    },
    {
      title: "客户微信",
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      width: 100,
      fixed: "left",
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const { wechatNumber } = record;
        return <TXListRow className="w-[100px]" list={wechatNumber} />;
      },
    },
    {
      title: "客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 120,
      fixed: "left",
      render: (phoneNumbers: string[]) => (
        <TXListRow className="w-[120px]" list={phoneNumbers} />
      ),
    },
    {
      title: "报备时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 130,
      render: (text: string) => {
        return (
          <p className={"text-[12px] w-[130px]  text-nowrap wes"}>{text}</p>
        );
      },
    },
    {
      title: "最新跟进记录",
      dataIndex: "lastFollow",
      key: "lastFollow",
      width: 160,
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const lastFollow = record.lastFollow || null;
        return (
          <div className="w-[160px] wes">
            {lastFollow ? (
              <>
                <Tooltip title={lastFollow.memo ?? ""}>
                  <p className={"max-w-[150px] truncate"}>
                    {lastFollow.memo || "-"}
                  </p>
                </Tooltip>
                <span className="text-[#999] text-xs">
                  {lastFollow.createTime}
                </span>
              </>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: "首次咨询项目",
      dataIndex: "intentionalProjectDTOList",
      key: "intentionalProjectDTOList",
      width: 150,
      render: (_: Text, record: IResBusinessV1CustomerGetPage) => {
        const data = record.intentionalProjectDTOList || [];
        return data.length ? (
          <div className="flex w-[150px] wes flex-wrap gap-1">
            {data.map((item: { dataId: string; dataName: string }) => (
              <Tag key={item.dataId}>{item.dataName}</Tag>
            ))}
          </div>
        ) : (
          <div className="w-[150px]">-</div>
        );
      },
    },
    {
      title: "最新派单项目",
      dataIndex: "lastDispatchDTO",
      key: "lastDispatchDTO",
      width: 150,
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const lastDispatchDTO = record.lastDispatchDTO || null;
        return lastDispatchDTO ? (
          <div className="w-[150px] wes">
            <Tooltip title={lastDispatchDTO.dataNames ?? ""}>
              <p className={"max-w-[150px] truncate"}>
                {lastDispatchDTO.dataNames || "-"}
              </p>
            </Tooltip>
            <span className="text-[#999] text-xs">
              {lastDispatchDTO.createTime}
            </span>
          </div>
        ) : (
          <div className="w-[150px]">-</div>
        );
      },
    },
    {
      title: "城市",
      dataIndex: "areaCode",
      key: "areaCode",
      width: 100,
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        const areaName = record?.areaCode
          ? AddressHelper.getInstance()
              .getAreaNamePath(record?.areaCode)
              .join("/")
          : "-";
        return (
          <Tooltip placement={"top"} title={areaName}>
            <p className={"w-[100px] truncate"}>{areaName || "-"}</p>
          </Tooltip>
        );
      },
    },
    {
      title: "微信通过状态",
      dataIndex: "wechatStatus",
      key: "wechatStatus",
      width: 120,
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
      width: 80,
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
    {
      title: "来源渠道",
      dataIndex: "channelName",
      key: "channelName",
      width: 100,
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 180,
      render: (_: string, record: IResBusinessV1CustomerGetPage) => {
        return (
          <Observer>
            {() => {
              const isInvalid = record.customerType === "INVALID_CUSTOMER";

              return (
                <TXTableAction
                  className="w-[180px]"
                  maxCount={4}
                  actions={[
                    {
                      label: "派单",
                      disabled: isInvalid,
                      auth: MyCustomerAuth.customerDispatch,
                      disabledTips: "无效客户不允许派单",
                      onClick: () => {
                        refs.editDispatchRecordRef.current?.openModal({
                          customerId: record.id,
                          phoneNumber: record.phoneNumber,
                        });
                      },
                    },
                    {
                      label: "详情",
                      onClick: () => {
                        refs.customerDrawerRef.current?.openDrawer({
                          customerId: record.id,
                        });
                      },
                      auth: true,
                    },
                    {
                      label: "编辑",
                      onClick: () => {
                        refs.editRef.current?.openModal({ id: record.id });
                      },
                      auth: MyCustomerAuth.customerUpdate,
                    },
                    {
                      label: "协作",
                      onClick: () => {
                        refs.collRef.current?.openModal({
                          existCustomerId: record.id,
                        });
                      },
                      auth: MyCustomerAuth.customerCollab,
                    },
                    {
                      label: "合并",
                      onClick: () => {
                        refs.mergeCustomerModalRef.current?.openModal({
                          id: record.id,
                        });
                      },
                      auth: MyCustomerAuth.customerMerge,
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

  const rowSelectionProps = logic.transferVisible
    ? {
        rowSelection: {
          selectedRowKeys: logic.selectedRowKeys,
          onChange: logic.onSelectChange,
        },
      }
    : {};

  return (
    <TXTable<IResBusinessV1CustomerGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="MY_CUSTOMER"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loadingList}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
      {...rowSelectionProps}
    />
  );
});
