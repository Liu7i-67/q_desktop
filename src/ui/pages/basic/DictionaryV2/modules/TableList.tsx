import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { IPagination } from "@/utils/interface";
import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { DictionaryV2Auth } from "../auth";
import { IDictionaryV2 } from "../interface";
import { useStore } from "../store/RootStore";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<IDictionaryV2>[] = [
    {
      title: "字典编码",
      dataIndex: "dictCode",
      key: "dictCode",
      width: 300,
    },
    {
      title: "字典名称",
      dataIndex: "dictName",
      key: "dictName",
      width: 300,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 140,
    },
    {
      title: "最后修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 140,
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      width: 90,
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: {
            true: {
              color: "green",
              text: "是",
            },
            false: {
              color: "red",
              text: "否",
            },
          },
        },
      },
    },
    {
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[180px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    label: "编辑",
                    type: "EDIT",
                    auth: DictionaryV2Auth.dictUpdate,
                  },
                  {
                    label: "字典配置",
                    type: "DETAIL",
                    auth: true,
                  },
                  {
                    label: "删除",
                    type: "DELETE",
                    disabled: true,
                    auth: true,
                    disabledTips: "暂不支持此操作",
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
    <TXTable<IDictionaryV2>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="BASIC_DICTIONARYV2"
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
