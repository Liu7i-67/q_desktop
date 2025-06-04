import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { AdvertiserManagementAuth } from "@/pages/xhs-spotlight/advertise/auth";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

export function useCol(props: { logic: any }) {
  const { openEditModal } = props.logic;
  return useMemo(
    () => [
      {
        title: "广告主名称",
        dataIndex: "advertiserName",
        key: "advertiserName",
        fixed: "left",
        width: 120,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 120,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD") : "-",
      },
      {
        title: "手机号",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 120,
        render: (text: string) => <TXCopyableTableCell copyText={text} />,
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
        width: 120,
        render: (text: string) => {
          return (
            <Tooltip title={text ?? ""} placement="top">
              <p className={"max-w-[120px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "最后修改时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 120,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD") : "-",
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        width: 120,
        fixed: "right",
        render: (text: string, record: any) => {
          return (
            <>
              {AdvertiserManagementAuth.advertiserManagementUpdate && (
                <Button type="link" onClick={() => openEditModal(record)}>
                  修改
                </Button>
              )}
            </>
          );
        },
      },
    ],
    []
  );
}
