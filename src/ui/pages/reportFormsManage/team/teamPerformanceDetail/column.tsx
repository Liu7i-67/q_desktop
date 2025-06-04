import { useMemo } from "react";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { TeamAuth } from "../auth";
import { TXButton } from "@/components/TXButton";

export const useColumns = (props: { logic: any }) => {
  return useMemo<ColumnsType>(
    () => [
      {
        title: "提交日期",
        dataIndex: "createDate",
        key: "createDate",
        render: (text: any) => dayjs(text).format("YYYY-MM-DD"),
      },
      {
        title: "成交金额",
        dataIndex: "dealAmount",
        key: "dealAmount",
        render: (text: any) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "数据明细",
        key: "action",
        width: 180,
        fixed: "right",
        render: (_, record) => (
          <TXButton
            type="link"
            onClick={() => {
              props.logic.openTeamDetailDraw(record);
            }}
            auth={TeamAuth.teamPerformance_personalDetail}
          >
            成交详情
          </TXButton>
        ),
      },
    ],
    []
  );
};
