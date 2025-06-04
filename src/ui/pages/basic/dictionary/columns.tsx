import { Button, Tooltip } from "antd";
import { useMemo } from "react";
import { renderEnable } from "../employee/columns";
import { DictAuth } from "@/pages/basic/dictionary/auth";
import { TXTableAction } from "@/components/TXTableAction";

export function useCol(logic: any) {
  const { openEditModal, openDictValueDrawer } = logic;

  return useMemo(() => {
    return [
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
        render: (text: boolean) => {
          return renderEnable(text);
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
        width: 180,
        key: "action",
        fixed: "right",
        render: (text: any, record: any) => {
          const { id, dictName, dictCode, memo, enableFlag } = record;
          return (
            <TXTableAction
              className="w-[180px]"
              actions={[
                {
                  label: "编辑",
                  type: "EDIT",
                  auth: DictAuth.dictUpdate,
                  onClick: () => {
                    openEditModal({
                      editDictId: id,
                      dictCode,
                      dictName,
                      memo,
                      enableFlag,
                    });
                  },
                },
                {
                  label: "字典配置",
                  auth: true,
                  onClick: () => {
                    openDictValueDrawer(dictCode, dictName);
                  },
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
        },
      },
    ];
  }, []);
}
