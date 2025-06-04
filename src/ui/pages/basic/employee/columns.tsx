import { useMemo } from "react";
import { EUserType } from "@/utils/user-helper/interface";
import { Button, Popconfirm, Tag } from "antd";
import { UserAuth } from "@/pages/basic/employee/auth";
import { handleCopy } from "@/utils/tools";

export const renderUserType = (userType: EUserType) => {
  switch (userType) {
    case EUserType.CONSULTANT:
      return <Tag color={"pink"}>咨询师</Tag>;
    case EUserType.ACCOUNTANT:
      return <Tag color={"red"}>财务</Tag>;
    case EUserType.BUSINESS:
      return <Tag color={"blue"}>商务</Tag>;
    case EUserType.CUSTOMER_SERVICE:
      return <Tag color={"orange"}>客服</Tag>;
    case EUserType.ORG:
      return <Tag>机构</Tag>;
  }
};

export const renderEnable = (flag: boolean) => {
  switch (flag) {
    case true:
      return <Tag color={"green"}>是</Tag>;
    case false:
      return <Tag color="red">否</Tag>;
  }
};

export function useCol(params: { logic: any }) {
  const { openAddModalUpdate, setUpdateModalData, onResetPsw } = params.logic;

  return useMemo(() => {
    return [
      {
        title: "用户类型",
        dataIndex: "userType",
        key: "userType",
        width: 80,
        render: (text: any) => {
          return renderUserType(text);
        },
      },
      {
        title: "账号",
        dataIndex: "userAccount",
        key: "userAccount",
        width: 100,
        render: (text: any) => {
          return (
            <p
              className={"hover:underline cursor-pointer"}
              onClick={() => {
                handleCopy(text);
              }}
            >
              {text}
            </p>
          );
        },
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "userName",
        width: 150,
      },
      {
        title: "电话",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 150,
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
        width: 150,
        render: (text: string) => (text ? text : "-"),
      },
      {
        title: "角色",
        dataIndex: "relationRoleNames",
        key: "relationRoleNames",
        width: 120,
      },
      {
        title: "所属部门",
        dataIndex: "relationDeptNames",
        key: "relationDeptNames",
        width: 150,
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
        title: "上次登录时间",
        dataIndex: "lastLoginTime",
        key: "lastLoginTime",
        width: 160,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "操作",
        key: "action",
        fixed: "right",
        width: 200,
        render: (text: any, record: any) => {
          const { id } = record;
          return (
            <>
              <Popconfirm
                title={"确认重置该员工密码吗？"}
                description={
                  <div className={"text-sm text-gray-400 flex items-center"}>
                    初始密码：
                    <p
                      className={
                        "text-md text-black hover:underline cursor-pointer"
                      }
                      onClick={() => {
                        handleCopy("tx123456");
                      }}
                    >
                      tx123456
                    </p>
                  </div>
                }
                onConfirm={() => {
                  onResetPsw(id);
                }}
              >
                <Button type={"link"} size={"small"}>
                  重置密码
                </Button>
              </Popconfirm>
              {UserAuth.userUpdate && (
                <Button
                  type={"link"}
                  size={"small"}
                  onClick={() => {
                    openAddModalUpdate();
                    setUpdateModalData(record);
                  }}
                >
                  编辑
                </Button>
              )}
              <Button type={"link"} size={"small"} danger disabled>
                删除
              </Button>
            </>
          );
        },
      },
    ];
  }, []);
}
