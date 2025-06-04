import { cn } from "@/utils/tools";
import * as echarts from "echarts";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "../store";

export interface IStatisticsPieProps {
  /**
   * @code 请求报表接口的 code
   */
  code: string;
  /**
   * @options 饼图配置options
   */
  option: any;
  /**
   * @className
   */
  className?: string;
}

function StatisticsPie(props: IStatisticsPieProps) {
  const { code, option, className = "" } = props;
  const formValues = useSelector((x) => x.formValues);
  const { activeTag, isStatistics } = useSelector((x) => x.state);
  const { getStatisticsData } = useSelector((x) => x.logic);
  /**
   * @myCharts echarts 示例对象
   */
  const myCharts = useMemo(() => {
    if (document.getElementById("statisticsPie")) {
      return echarts.init(document.getElementById("statisticsPie"));
    }
    return null;
  }, [option]);

  /**
   * @initPie 初始化饼图
   */
  const initPie = useCallback(() => {
    myCharts?.setOption(option);
  }, [myCharts, option]);

  /** *
   * @handleResize 监听 resize 事件
   */
  const handleResize = useCallback(() => {
    myCharts?.resize();
  }, [myCharts]);

  useEffect(() => {
    initPie();
  }, [initPie]);

  useEffect(() => {
    if (isStatistics) {
      getStatisticsData(code);
    }
  }, [activeTag, formValues]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div
      id={"statisticsPie"}
      className={cn(
        "w-full h-full bg-white p-4 rounded-md shadow-md border-[0.1px] ",
        className
      )}
    ></div>
  );
}

export default StatisticsPie;
