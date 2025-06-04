import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { ITaskList } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { CrossTips } from "./CrossTips";
import {
  customerStatusInfo,
  wechatStatusInfo,
} from "@/service/business/v1/customer-follow/get-page";
import { TaskOverviewAuth } from "../../auth";
import { todayTaskTagObj } from "@/utils/enum/modules/todayTaskStatus";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<ITaskList>[] = [
    {
      title: "所属策略",
      width: 240,
      dataIndex: "strategyName",
      key: "strategyName",
    },
    {
      title: "客户所属人",
      width: 160,
      dataIndex: "ownerName",
      key: "ownerName",
      render: (ownerName, record) => {
        const list = [ownerName];

        if (record.hasCrossStoreRecord) {
          list.unshift(<CrossTips />);
        }

        return (
          <TXListRow className="w-[160px]" separator={false} list={list} />
        );
      },
    },
    {
      title: "协作人",
      width: 160,
      dataIndex: "collabList",
      key: "collabList",
      dataType: "list",
    },
    {
      title: "客户电话",
      width: 160,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      dataType: "list",
    },
    {
      title: "客户微信",
      width: 160,
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      dataType: "list",
    },
    {
      title: "微信通过状态",
      width: 120,
      dataIndex: "wechatStatus",
      key: "wechatStatus",
      dataType: "badge",
      dataExtraProps: {
        badge: {
          options: wechatStatusInfo,
        },
      },
    },
    {
      title: "客户状态",
      width: 100,
      dataIndex: "customerStatus",
      key: "customerStatus",
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
      title: "任务所属人",
      width: 160,
      dataIndex: "createUserName",
      key: "createUserName",
    },
    {
      title: "任务状态",
      width: 100,
      dataIndex: "statusEnum",
      key: "statusEnum",
      dataType: "iconTag",
      dataExtraProps: {
        iconTag: {
          options: todayTaskTagObj,
        },
      },
    },
    {
      title: "任务截止时间",
      width: 120,
      dataIndex: "endDate",
      key: "endDate",
      dataType: "date",
    },
    {
      title: "跟进内容",
      width: 160,
      dataIndex: "memo",
      key: "memo",
      dataExtraProps: {
        text: {
          row: 2,
        },
      },
    },
    {
      title: "任务开始时间",
      width: 120,
      dataIndex: "startDate",
      key: "startDate",
      dataType: "date",
    },
    {
      title: "任务完成时间",
      width: 140,
      dataIndex: "followedTime",
      key: "followedTime",
      dataType: "datetime",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 80,
      fixed: "right",
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[80px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    icon: "icon-renwu",
                    label: "客户详情",
                    type: "DETAIL",
                    auth: true,
                  },
                  {
                    label: "取消",
                    icon: "icon-quxiao-1",
                    type: "CANNEL",
                    auth:
                      TaskOverviewAuth.taskOverviewCancelTask &&
                      ["WAIT_START", "WAIT_COMPLETE"].includes(
                        record.statusEnum || ""
                      ),
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
    <TXTable<ITaskList>
      columns={columns}
      dataSource={logic.dataSource}
      size="small"
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="TASKLIST_LIST_TABLE"
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
