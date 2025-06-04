import { transformTreeByDeleteKey } from "@/utils/tools";
import { Col, Collapse, Divider, Row, Table } from "antd";
import { useMemo } from "react";
import { ReportCode } from "../../types";
import useTagHeight from "../hooks/useSearchItemHeight";
import { useSelector } from "../store";
import SearchItem from "./searchItem";
import StatisticsPie from "./statisticsPie";

export interface IProps {
  info: any;
}

const StatisticsAreaProportionPage = (props: IProps) => {
  const { info } = props;
  const {
    panelData,
    tableDataSource,
    importantTotal,
    importantTotalPercentage,
    importantList,
  } = useSelector((x) => x.state);
  const { runStatisticsData } = useSelector((x) => x.api);
  const { tagHeight } = useTagHeight(76);

  const option = useMemo(() => {
    // 图标显示数据
    const legendData = panelData.reduce(
      (prev, item) => [...prev, item?.name || "-"],
      []
    );
    // 仪表盘显示数据
    const seriesData = panelData.reduce(
      (prev, item) => [
        ...prev,
        { name: item?.name || "-", value: item?.value },
      ],
      []
    );
    // 饼图配置项
    const option = {
      title: {
        text: "地区比例统计",
        left: "left",
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          return params?.value !== undefined
            ? `${params?.name} <br/> ${params?.marker} ${params?.name} ${params?.data?.value}`
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
      series: [
        {
          name: "姓名",
          type: "pie",
          radius: "70%",
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
  }, [panelData]);

  return (
    <>
      <SearchItem type="range" info={info} />
      <Collapse
        className={`w-full h-full`}
        accordion
        defaultActiveKey={["panel"]}
        bordered={false}
        items={[
          {
            key: "panel",
            label: "城市数据",
            children: (
              <div className="w-full">
                <Row>
                  <Col span={19}>
                    <StatisticsPie
                      className="h-full"
                      code={ReportCode.Customer_Belongs_Schedule}
                      option={option}
                    />
                  </Col>
                  <Col span={5}>
                    <div className="ml-4 bg-white border-[0.1px] shadow-md rounded-md p-2">
                      <div className="px-2 ">
                        <div className="font-bold text-[18px] pt-4 pb-2">
                          重点区域
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col items-center">
                            <div className="text-[12px] tex-gray-500/60">
                              重点客户数
                            </div>
                            <div className="font-bold text-[16px]">
                              {importantTotal}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[12px] tex-gray-500/60">
                              重点占比
                            </div>
                            <div className="font-bold text-[16px]">
                              {importantTotalPercentage.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                        <Divider
                          style={{
                            margin: "12px 0",
                          }}
                        />
                        <div className="overflow-y-auto pr-2 h-[calc(100vh-620px)]">
                          {importantList?.map((item) => (
                            <div
                              key={item.name}
                              className="mb-2 rounded-md shadow-md px-2 py-4 border-[0.1px]"
                            >
                              <div className="font-bold text-[18px] pb-2">
                                {item.name}
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex flex-col items-center">
                                  <div>客户数</div>
                                  <div>{item.value}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div>占比</div>
                                  <div>{item.percentage.toFixed(2)}%</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            key: "table",
            label: "数据表格",
            children: (
              <Table
                scroll={{
                  x: "max-content",
                  y: `calc(100vh - ${508 + tagHeight}px)`,
                }}
                loading={runStatisticsData.loading}
                dataSource={transformTreeByDeleteKey(
                  [...tableDataSource],
                  "children",
                  (node: any) => !node.children?.length
                )}
                rowKey="areaCode"
                columns={[
                  {
                    title: "地区",
                    dataIndex: "name",
                    key: "name",
                    width: 800,
                  },
                  {
                    title: "客户数	",
                    dataIndex: "value",
                    key: "value",
                  },
                ]}
                className="mt-4"
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default StatisticsAreaProportionPage;
