import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button } from "antd";
import { useStore } from "../store/RootStore";
import { IDataSource } from "../store/RootStore/interface";

const ConfigTable = observer(function ConfigTable_() {
  const root = useStore();
  const { logic } = root;

  const columns: ITXColumnType<IDataSource>[] = [
    {
      title: "字典编码",
      dataIndex: "dictCode",
      key: "dictCode",
    },
    {
      title: "字典名称",
      dataIndex: "dictName",
      key: "dictName",
      dataType: "text",
      dataExtraProps: {
        text: {
          row: 3,
        },
      },
    },
    {
      title: "字典值",
      dataIndex: "dictValue",
      key: "dictValue",
      dataType: "text",
      dataExtraProps: {
        text: {
          row: 3,
        },
      },
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
      dataType: "text",
      dataExtraProps: {
        text: {
          row: 3,
        },
      },
    },
    {
      title: "操作",
      width: 80,
      render: (_, record) => {
        return (
          <div>
            <Button
              size={"small"}
              type={"link"}
              onClick={() => {
                logic.onOpenAddorEditDictionaryValueModal(record);
              }}
            >
              编辑
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className={"mb-2"}>
        <Button
          type={"primary"}
          onClick={() => {
            logic.onOpenAddorEditDictionaryValueModal({
              dictCode: logic.initData.dictCode,
            });
          }}
        >
          新增
        </Button>
      </div>
      <>
        <TXTable
          scroll={{
            x: "max-content",
            y: "calc(100vh - 376px)",
          }}
          columns={columns}
          rowKey="id"
          dataSource={logic.dataSource}
          pagination={{
            pageSize: logic.pagination.pageSize,
            current: logic.pagination.current,
            // total: logic.pagination.total,
            showSizeChanger: true,
            showTotal: (t) => `共${t}条`,
          }}
        />
      </>
    </div>
  );
});

export default ConfigTable;
