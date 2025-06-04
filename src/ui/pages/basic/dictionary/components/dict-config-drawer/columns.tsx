import { useMemo } from "react";
import { Button } from "antd";
import { renderEnable } from "@/pages/basic/employee/columns";

export function useCol(logic: any) {
  const { openEditDictValue } = logic;
  return useMemo(() => {
    return [
      {
        title: "字典编码",
        dataIndex: "dictCode",
        key: "dictCode",
      },
      {
        title: "字典名称",
        dataIndex: "dictName",
        key: "dictName",
      },

      {
        title: "字典值",
        dataIndex: "dictValue",
        key: "dictValue",
      },
      {
        title: "是否启用",
        dataIndex: "enableFlag",
        key: "enableFlag",
        width: 90,
        render: (text: boolean) => {
          return renderEnable(text);
        },
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
      },
      {
        title: "操作",
        width: 80,
        render: (_: any, record: any) => {
          const { id, dictName, dictCode, dictValue, memo, enableFlag } =
            record;
          return (
            <div>
              <Button
                size={"small"}
                type={"link"}
                onClick={() => {
                  openEditDictValue({
                    id,
                    dictCode,
                    dictName,
                    dictValue,
                    memo,
                    enableFlag,
                  });
                }}
              >
                编辑
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);
}
