import { Table } from "antd";
import { useMemo } from "react";
import { ReportCode } from "../../types";
import useTagHeight from "../hooks/useSearchItemHeight";
import { useSelector } from "../store";
import SearchItem from "./searchItem";
import StatisticsPie from "./statisticsPie";

export interface IProps {
  info: any;
}

const StatisticsIntentionProjectPage = (props: IProps) => {
  const { info } = props;
  const { panelData, activeTag } = useSelector((x) => x.state);
  const { runStatisticsData } = useSelector((x) => x.api);
  const { tagHeight } = useTagHeight(76);

  const option = useMemo(() => {
    // 图标显示数据
    const legendData = panelData.reduce(
      (prev, item) => [...prev, item.dataName || "-"],
      []
    );
    // 仪表盘显示数据
    const seriesData = panelData.reduce(
      (prev, item) => [
        ...prev,
        { name: item.dataName || "-", value: item.numberOfCustomers },
      ],
      []
    );
    // 饼图配置项
    const option = {
      title: {
        text: "意向项目统计",
        left: "left",
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          return params.value !== undefined
            ? `${params.name} <br/> ${params.marker} ${params.name} ${params.data.value}`
            : null;
        },
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: 0,
        top: 50,
        data: legendData,
        icon: "circle",
        pageIconSize: 12,
      },
      outerRadius: 0.8,
      series: [
        {
          name: "姓名",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            formatter: (params: any) => {
              return params.value !== undefined
                ? `${params.name} \n ${params.percent}%`
                : null;
            },
          },
        },
      ],
    };
    return option;
  }, [panelData, activeTag]);

  return (
    <>
      <SearchItem type="range" info={info} />
      <StatisticsPie
        code={ReportCode.Customer_Intention_Schedule}
        option={option}
        className="h-[300px]"
      />
      <Table
        scroll={{
          x: "max-content",
          // y: 'calc(100vh - 757px)'
          y: `calc(100vh - ${681 + tagHeight}px)`,
        }}
        loading={runStatisticsData.loading}
        dataSource={panelData}
        rowKey="dataId"
        columns={[
          {
            title: "项目",
            dataIndex: "dataName",
            key: "dataName",
            // width: 800,
          },
          {
            title: "客资数",
            dataIndex: "numberOfCustomers",
            key: "numberOfCustomers",
          },
        ]}
        className="mt-2"
      />
    </>
  );
};

export default StatisticsIntentionProjectPage;
