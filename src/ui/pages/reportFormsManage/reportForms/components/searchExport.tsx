import { cn } from "@/utils/tools";
import { Image } from "antd";
import { useSelector } from "../store";
import SearchItem from "./searchItem";
import StatisticsAreaProportionPage from "./StatisticsAreaProportionPage";
import StatisticsIntentionProjectPage from "./StatisticsIntentionProjectPage";
import { RED_BOOK_TRAFFIC_CONVERSION_REPORT } from "../modules/RED_BOOK_TRAFFIC_CONVERSION_REPORT";

const SearchExport = (props: { info: any }) => {
  const { info } = props;

  const { isStatistics } = useSelector((x) => x.state);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-10 items-center flex-col mt-24",
        isStatistics ? "mt-0 gap-1 items-start" : ""
      )}
    >
      {(() => {
        switch (info.key) {
          // 小红书流量转化报表
          case "RED_BOOK_TRAFFIC_CONVERSION_REPORT": {
            return <RED_BOOK_TRAFFIC_CONVERSION_REPORT />;
          }
          case "orgDayForm":
          case "customerDayForm":
          case "personalPerformanceForm":
          case "teamPerformanceForm":
          case "teamPerformanceTotalForm":
          case "channleNeWCustomerDealExcel":
            // 自定义范围选择
            return <SearchItem type="range" info={info} />;
          case "intentionProject":
            return <StatisticsIntentionProjectPage info={info} />;
          case "areaProportion":
            return <StatisticsAreaProportionPage info={info} />;
          case "businessWeekForm":
            // 周选择
            return <SearchItem type="week" info={info} />;
          case "businessMonthForm":
            // 月选择
            return <SearchItem type="month" info={info} />;
          case "xhsShuntForm":
            // 日选择
            return <SearchItem type="day" info={info} />;
          case "materialLinkData":
          case "liveData":
            // 只能选择今天到之前一年的日期
            return <SearchItem type="oneYear" info={info} />;
          case "individualRetentionRate":
          case "xhsPutForm":
          case "OACustomForm":
            return <SearchItem type="rangeTime" info={info} />;
          case "none":
            return (
              <Image
                src={"https://resources.taoxiplan.com/logo.png"}
                width={100}
                height={100}
                preview={false}
                className="rounded-full  hover:shadow-lg transition-shadow"
              />
            );
          default:
            return null;
        }
      })()}
      {!isStatistics && <h1 className="text-5xl font-bold">{info.text}</h1>}
    </div>
  );
};

export default SearchExport;
