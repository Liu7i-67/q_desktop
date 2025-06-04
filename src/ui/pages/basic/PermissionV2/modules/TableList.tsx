import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, Table, TableColumnsType, Switch, Select } from "antd";
import { IDataSource } from "../interface";

const EDataScopeRangeMap: { [key in string]: string } = {
  SELF: "本人",
  DEPT: "本部门",
  ALL: "全部",
};

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: TableColumnsType<IDataSource> = [
    {
      title: "权限名称",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "Key",
      dataIndex: "permissionKey",
      key: "permissionKey",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      render: (_, record) => (
        <Observer>
          {() => (
            <>
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                checked={record.checked}
                onChange={(checked: boolean) =>
                  logic.handleSetPermissionTreeSwitch(checked, record.id)
                }
              />
              {record.dataScopeRange &&
              Array.isArray(record.dataScopeRange) &&
              record.dataScopeRange.length ? (
                <Select
                  onChange={(value) =>
                    logic.handleSetDataScope(value, record.id)
                  }
                  className={"ml-2 !w-[100px]"}
                  value={record.dataScope}
                  placeholder={"范围"}
                >
                  {record.dataScopeRange.map((item: string) => (
                    <Select.Option value={item} key={item}>
                      {EDataScopeRangeMap[item]}
                    </Select.Option>
                  ))}
                </Select>
              ) : null}
            </>
          )}
        </Observer>
      ),
    },
  ];

  return (
    <>
      <Table<IDataSource>
        columns={columns}
        dataSource={computed.newList}
        pagination={false}
        rowKey="id"
        loading={computed.loading}
        scroll={{
          x: "max-content",
          y: "calc(100vh - 340px)",
        }}
        expandable={{
          childrenColumnName: "childList",
          expandedRowKeys: logic.expandedRowKeys,
          onExpandedRowsChange: (keys) =>
            logic.handleExpandRowsChange(keys as string[]),
        }}
      />
      <div className="flex justify-end items-center mt-[16px]">
        <span className="text-red-500">
          注意：在编辑完权限后请点击此按钮进行保存
        </span>
        <Button
          className="ml-3"
          type="primary"
          onClick={() => logic.setPermission()}
        >
          保存
        </Button>
      </div>
    </>
  );
});
