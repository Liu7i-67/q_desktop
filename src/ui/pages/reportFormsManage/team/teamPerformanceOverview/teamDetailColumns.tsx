import TXExplainQuestionTooltip from "@/components/TXExplainQuestionTooltip";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { TeamAuth } from "../auth";

export const useTeamDetailColumns = (params: { logic: any }) => {
  const { logic } = params;
  return useMemo<ColumnsType>(
    () => [
      {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 200,
        fixed: "left",
      },
      {
        title: "统计日期",
        key: "statTime",
        width: 200,
        fixed: "left",
        render: (_, record) =>
          `${dayjs(record.statTimeStart).format("YYYY-MM-DD")} ~ ${dayjs(
            record.statTimeEnd
          ).format("YYYY-MM-DD")}`,
      },
      {
        title: "组名",
        dataIndex: "deptNames",
        key: "deptNames",
        width: 200,
        render: (text: string[]) => (
          <div className="w-[180px] wes">{text?.join?.("、") || "-"}</div>
        ),
      },
      {
        title: "上报业绩-按成交创建时间",
        toolTipTitle:
          "统计指定员工在指定时间范围内创建或参与协作，成交状态不是已作废的成交，按照合作比率分配的成交金额",
        dataIndex: "amountOfDealByDealCreateTime",
        key: "amountOfDealByDealCreateTime",
        width: 200,
        defaultSortOrder: "descend",
        sorter: true,
        render: (text) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "确认业绩-按成交确认时间",
        toolTipTitle:
          "统计指定员工在指定时间范围内创建或参与协作，成交状态是已确认的成交，按照合作比率分配的确认金额",
        dataIndex: "amountOfDealByDealConfirmDate",
        key: "amountOfDealByDealConfirmDate",
        width: 200,
        render: (text) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "客户总数",
        toolTipTitle: "客户总数-统计归属人是指定人的客户总数",
        dataIndex: "totalNumberOfCustomer",
        key: "totalNumberOfCustomer",
        width: 200,
      },
      {
        title: "指派客户总数",
        toolTipTitle: "客户总数-统计归属人是指定人的客户总数",
        dataIndex: "totalNumberOfCustomerExistLeads",
        key: "totalNumberOfCustomerExistLeads",
        width: 200,
      },
      {
        title: "报备客户总数",
        toolTipTitle: "统计归属人是指定人，且不是由线索指派创建的客户总数",
        dataIndex: "totalNumberOfCustomerNotExistLeads",
        key: "totalNumberOfCustomerNotExistLeads",
        width: 200,
      },
      {
        title: "客户数-按客户创建时间",
        toolTipTitle: "统计在指定时间范围内创建，归属人是指定员工的客户数量",
        dataIndex: "numberOfCustomerByCustomerCreateTime",
        key: "numberOfCustomerByCustomerCreateTime",
        width: 200,
      },
      {
        title: "有效客户数-按客户创建时间",
        toolTipTitle:
          "统计在指定时间范围内创建，归属人是指定员工，目前客户类型不是无效客户的客户数量",
        dataIndex: "numberOfValidCustomerByCustomerCreateTime",
        key: "numberOfValidCustomerByCustomerCreateTime",
        width: 200,
      },
      {
        title: "无效客户数-按客户创建时间",
        toolTipTitle:
          "统计在指定时间范围内创建，归属人是指定员工，目前客户类型是无效客户的客户数量",
        dataIndex: "numberOfInvalidCustomerByCustomerCreateTime",
        key: "numberOfInvalidCustomerByCustomerCreateTime",
        width: 200,
      },
      {
        title: "到院有效客户数-按客户创建时间",
        toolTipTitle:
          "统计指定时间范围内创建，且有指定员工创建了到院的有效客户数量",
        dataIndex: "numberOfValidCustomerArrivalByCustomerCreateTime",
        key: "numberOfValidCustomerArrivalByCustomerCreateTime",
        width: 200,
      },
      {
        title: "到院有效客户数-按到院创建时间",
        toolTipTitle: "统计指定时间范围内有指定员工创建了到院的有效客户数量",
        dataIndex: "numberOfValidCustomerArrivalByArrivalCreateTime",
        key: "numberOfValidCustomerArrivalByArrivalCreateTime",
        width: 200,
      },
      {
        title: "成交有效客户数-按客户创建时间",
        toolTipTitle:
          "统计指定时间范围内创建的有效客户中，有指定员工创建或参与协作，成交状态不是已作废的成交的客户数量",
        dataIndex: "numberOfValidCustomerDealByCustomerCreateTime",
        key: "numberOfValidCustomerDealByCustomerCreateTime",
        width: 200,
      },
      {
        title: "成交有效客户数-按成交创建时间",
        toolTipTitle:
          "统计指定时间范围内指定员工创建或参与协作，成交状态不是已作废的成交中的有效客户数量",
        dataIndex: "numberOfValidCustomerDealByDealCreateTime",
        key: "numberOfValidCustomerDealByDealCreateTime",
        width: 200,
      },
      {
        title: "复购有效客户数-按客户创建时间",
        toolTipTitle:
          "统计指定时间范围内创建的有效客户中，有1次以上由指定员工创建或参与协作且成交状态不是作废的成交的客户数量",
        dataIndex: "numberOfValidCustomerDealRepurchaseByCustomerCreateTime",
        key: "numberOfValidCustomerDealRepurchaseByCustomerCreateTime",
        width: 200,
      },
      {
        title: "复购有效客户数-按成交创建时间",
        toolTipTitle:
          "统计指定时间范围内有1次以上由指定员工创建或参与协作且成交状态不是作废的成交的有效客户数量",
        dataIndex: "numberOfValidCustomerDealRepurchaseByDealCreateTime",
        key: "numberOfValidCustomerDealRepurchaseByDealCreateTime",
        width: 200,
      },
      {
        title: "派单有效客户数-按客户创建时间",
        toolTipTitle: "统计指定员工在指定时间范围内创建且派单了的有效客户数量",
        dataIndex: "numberOfValidCustomerDispatchByCustomerCreateTime",
        key: "numberOfValidCustomerDispatchByCustomerCreateTime",
        width: 200,
      },
      {
        title: "派单有效客户数-按派单创建时间",
        toolTipTitle: "统计指定员工在指定时间范围内创建了派单的有效客户数量",
        dataIndex: "numberOfValidCustomerDispatchByDispatchCreateTime",
        key: "numberOfValidCustomerDispatchByDispatchCreateTime",
        width: 200,
      },
      {
        title: "派单有效客户率-按客户创建时间",
        toolTipTitle:
          "派单有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDispatchByCustomerCreateTime",
        key: "rateOfValidCustomerDispatchByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "派单有效客户率-按派单创建时间",
        toolTipTitle:
          "派单有效客户数-按派单创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDispatchByDispatchCreateTime",
        key: "rateOfValidCustomerDispatchByDispatchCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "指派有效客户数-按客户创建时间",
        toolTipTitle:
          "统计在指定时间范围内创建，归属人是指定员工，且由线索指派而创建的有效客户数量",
        dataIndex: "numberOfValidCustomerExistLeadsByCustomerCreateTime",
        key: "numberOfValidCustomerExistLeadsByCustomerCreateTime",
        width: 200,
      },
      {
        title: "填写电话有效客户数-按客户创建时间",
        toolTipTitle:
          "统计指定时间范围内创建，归属人是指定员工，且电话不为空的客户数量",
        dataIndex: "numberOfValidCustomerExistMobileByCustomerCreateTime",
        key: "numberOfValidCustomerExistMobileByCustomerCreateTime",
        width: 200,
      },
      {
        title: "微信通过有效客户数-按客户创建时间",
        toolTipTitle:
          "统计在指定时间范围内创建，归属人是指定员工，目前微信通过状态为已通过的客户数量",
        dataIndex: "numberOfValidCustomerWechatPassByCustomerCreateTime",
        key: "numberOfValidCustomerWechatPassByCustomerCreateTime",
        width: 200,
      },
      {
        title: "成交客单价",
        toolTipTitle: "上报业绩-按成交创建时间 / 成交有效客户数-按成交创建时间",
        dataIndex: "amountOfCustomerDeal",
        key: "amountOfCustomerDeal",
        width: 200,
        render: (text) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "派单价值",
        toolTipTitle: "上报业绩-按成交创建时间 / 派单有效客户数-按派单创建时间",
        dataIndex: "amountOfCustomerDispatch",
        key: "amountOfCustomerDispatch",
        width: 200,
        render: (text) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "报备有效客户数-按客户创建时间",
        toolTipTitle:
          "统计指定时间范围内创建，归属人是指定员工，且不是由线索指派创建的有效客户数量",
        dataIndex: "numberOfValidCustomerNotExistLeadsByCustomerCreateTime",
        key: "numberOfValidCustomerNotExistLeadsByCustomerCreateTime",
        width: 200,
        sorter: true,
      },
      {
        title: "无效客户率-按客户创建时间",
        toolTipTitle: "无效客户数-按客户创建时间 / 客户数-按客户创建时间",
        dataIndex: "rateOfInvalidCustomerByCustomerCreateTime",
        key: "rateOfInvalidCustomerByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "到院有效客户率-按到院创建时间",
        toolTipTitle:
          "到院有效客户数-按到院创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerArrivalByArrivalCreateTime",
        key: "rateOfValidCustomerArrivalByArrivalCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "到院有效客户率-按客户创建时间",
        toolTipTitle:
          "到院有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerArrivalByCustomerCreateTime",
        key: "rateOfValidCustomerArrivalByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "到院成交有效客户率-按到院成交创建时间",
        toolTipTitle:
          "到院有效客户数-按到院创建时间 / 成交有效客户数-按成交创建时间",
        dataIndex: "rateOfValidCustomerArrivalDealByArrivalDealCreateTime",
        key: "rateOfValidCustomerArrivalDealByArrivalDealCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "到院成交有效客户率-按客户创建时间",
        toolTipTitle:
          "到院有效客户数-按客户创建时间 / 成交有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerArrivalDealByCustomerCreateTime",
        key: "rateOfValidCustomerArrivalDealByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "成交有效客户率-按客户创建时间",
        toolTipTitle:
          "成交有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDealByCustomerCreateTime",
        key: "rateOfValidCustomerDealByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "成交有效客户率-按成交创建时间",
        toolTipTitle:
          "成交有效客户数-按成交创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDealByDealCreateTime",
        key: "rateOfValidCustomerDealByDealCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "复购有效客户率-按客户创建时间",
        toolTipTitle:
          "复购有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDealRepurchaseByCustomerCreateTime",
        key: "rateOfValidCustomerDealRepurchaseByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "复购有效客户率-按成交创建时间",
        toolTipTitle:
          "复购有效客户数-按成交创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerDealRepurchaseByDealCreateTime",
        key: "rateOfValidCustomerDealRepurchaseByDealCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "指派有效客户率-按客户创建时间",
        toolTipTitle:
          "指派有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerExistLeadsByCustomerCreateTime",
        key: "rateOfValidCustomerExistLeadsByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "填写电话有效客户率-按客户创建时间",
        toolTipTitle:
          "填写电话有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerExistMobileByCustomerCreateTime",
        key: "rateOfValidCustomerExistMobileByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "微信通过有效客户率-按客户创建时间",
        toolTipTitle:
          "微信通过有效客户数-按客户创建时间 / 有效客户数-按客户创建时间",
        dataIndex: "rateOfValidCustomerWechatPassByCustomerCreateTime",
        key: "rateOfValidCustomerWechatPassByCustomerCreateTime",
        width: 200,
        render: (text) => `${(text * 100).toFixed(2)}%`,
      },
      {
        title: "数据明细",
        key: "action",
        width: 200,
        fixed: "right",
        render: (_, record) => (
          <>
            {TeamAuth.teamPerformance_personalDetail && (
              <Button
                type="link"
                onClick={() => {
                  logic.openTeamPersonalPerformanceDraw(record);
                }}
              >
                成交详情
              </Button>
            )}
          </>
        ),
      },
    ],
    []
  );
};
