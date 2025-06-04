import { EDataScopeRangeMap } from "@/pages/basic/permission/types";
import { Select, Switch } from "antd";

export const useColumns = (state: any, logic: any) => {
  const { handleSetPermissionTreeSwitch, handleSetDataScope } = logic;
  return [
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
      key: "action",
      render: (_: any, record: any) => {
        return (
          <div className="flex justify-start items-center">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={record.checked}
              onChange={(checked: boolean) => {
                handleSetPermissionTreeSwitch(checked, record);
              }}
            />
            {record.dataScopeRange &&
            Array.isArray(record.dataScopeRange) &&
            record.dataScopeRange.length ? (
              <Select
                onChange={(value) => handleSetDataScope(value, record.id)}
                className={"ml-2 !w-[80px]"}
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
          </div>
        );
      },
    },
  ];
};
