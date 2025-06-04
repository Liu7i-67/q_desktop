import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Col, Progress, Row } from "antd";
import { classNames } from "@/utils/tools";

export const OverviewRow = observer(function OverviewRow_() {
  const root = useStore();
  const { logic } = root;

  const dataList = [
    {
      label: "今日截止任务数量",
      value: logic.totalInfo?.deadlineTaskCount ?? "-",
      subLabel: "总任务数：",
      subValue: logic.totalInfo?.taskCount ?? "-",
      strokeColor: {
        from: "#FF7F70",
        to: "#FF6852 ",
      },
    },
    {
      label: "今日截止任务-已完成",
      value: logic.totalInfo?.deadlineCompletedTaskCount ?? "-",
      strokeColor: {
        from: "#3CB45D ",
        to: "#58E17F",
      },
      subLabel: "总任务-已完成：",
      subValue: logic.totalInfo?.completedTaskCount ?? "-",
    },
    {
      label: "今日截止任务-未完成",
      value: logic.totalInfo?.deadlineWaitCompletedTaskCount ?? "-",
      strokeColor: {
        from: "#FE4693",
        to: "#FF72BD",
      },
      subLabel: "总任务-未完成：",
      subValue: logic.totalInfo?.waitCompletedTaskCount ?? "-",
    },
    {
      label: "今日截止任务-完成率",
      value: `${logic.totalInfo?.deadlineTaskCompletionRate || 0}%`,
      strokeColor: {
        from: "#0A64F7",
        to: "#4381FF",
      },
      subLabel: "总任务-完成率：",
      subValue: `${logic.totalInfo?.taskCompletionRate || 0}%`,
    },
  ];

  return (
    <Row className="bg-[#f7f8fc] mt-2 rounded-md shadow-md">
      {dataList.map((c, cIndex) => {
        return (
          <Col key={c.label} span={6} className="px-[48px] py-[8px]">
            <div className="text-[#999] text-[16px] wes">{c.label}</div>
            <div
              className={classNames({
                "text-[40px] font-bold": true,
                "border-r-[1px]": cIndex < 3,
              })}
            >
              {c.value}
            </div>
            <div className="-mb-2 wes">
              <span className="text-[#999]">{c.subLabel}</span>
              <span className="text-[#FA3564]">{c.subValue}</span>
            </div>
            <Progress
              percent={100}
              showInfo={false}
              className="max-w-[178px]"
              size="small"
              strokeColor={c.strokeColor}
            />
          </Col>
        );
      })}
    </Row>
  );
});
