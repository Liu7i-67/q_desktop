import { ReportFormsAuth } from "@/pages/reportFormsManage/reportForms/auth";
import SearchExport from "./components/searchExport";
import TagItem from "./components/tagItem";
import { useSelector } from "./store";

const Tag = () => {
  const TAGS = [
    {
      color: "blue",
      text: "机构地区商务日表",
      key: "orgDayForm",
      code: "A0001",
      auth: ReportFormsAuth.orgRegionBusinessReport,
    },
    {
      color: "green",
      text: "客户地区商务日表",
      key: "customerDayForm",
      code: "A0002",
      auth: ReportFormsAuth.customerRegionBusinessReport,
    },
    {
      color: "gold",
      text: "商务周表",
      key: "businessWeekForm",
      code: "A0003",
      auth: ReportFormsAuth.businessWeekReport,
    },
    {
      color: "purple",
      text: "商务月表",
      key: "businessMonthForm",
      code: "A0004",
      auth: ReportFormsAuth.businessMonthReport,
    },
    {
      color: "magenta",
      text: "小红书分流表",
      key: "xhsShuntForm",
      code: "B0001",
      auth: ReportFormsAuth.littleRedBookDiversionReport,
    },
    {
      color: "cyan",
      text: "小红书投放监测表",
      key: "xhsPutForm",
      code: "B0002",
      auth: ReportFormsAuth.littleRedBookPushReport,
    },
    {
      color: "cyan",
      text: "OA渠道客资监测表",
      key: "OACustomForm",
      code: "B0003",
      auth: ReportFormsAuth.oaChannelMonitoring,
    },
    {
      color: "volcano",
      text: "个人业绩明细表",
      key: "personalPerformanceForm",
      code: "C0001",
      auth: ReportFormsAuth.personalPerformanceDetailReport,
    },
    {
      color: "geekblue",
      text: "团队业绩明细表",
      key: "teamPerformanceForm",
      code: "C0002",
      auth: ReportFormsAuth.teamPerformanceDetailReport,
    },
    {
      color: "lime",
      text: "团队业绩总览表",
      key: "teamPerformanceTotalForm",
      code: "C0003",
      auth: ReportFormsAuth.teamPerformanceSummaryReport,
    },
    {
      color: "magenta",
      text: "渠道新客成交表",
      key: "channleNeWCustomerDealExcel",
      code: "C0010",
      auth: true,
    },
    {
      color: "purple",
      text: "意向项目统计",
      key: "intentionProject",
      code: "C0007",
      auth: true,
    },
    {
      color: "magenta",
      text: "地区比例统计",
      key: "areaProportion",
      code: "C0008",
      auth: true,
    },
    {
      color: "cyan",
      text: "素材链路数据表",
      key: "materialLinkData",
      code: "MATERIAL_LINK_DATA",
      auth: true,
    },
    {
      color: "volcano",
      text: "直播数据",
      key: "liveData",
      code: "ANCHOR_TRANSACTION_DATA",
      auth: true,
    },
    {
      color: "geekblue",
      text: "个人留资统计",
      key: "individualRetentionRate",
      code: "INDIVIDUAL_RETENTION_RATE",
      auth: ReportFormsAuth.individualRetention,
    },
    {
      color: "cyan",
      text: "小红书流量转化报表",
      key: "RED_BOOK_TRAFFIC_CONVERSION_REPORT",
      code: "RED_BOOK_TRAFFIC_CONVERSION_REPORT",
      auth: true,
    },
  ] as const;

  const { activeTag } = useSelector((x) => x.state);
  const { resetForm, setActiveTag } = useSelector((state) => state.logic);

  return (
    <>
      <div
        className="flex flex-wrap gap-2 justify-center mt-10"
        id="reportForm_tag_container"
      >
        {TAGS.map(
          ({ color, text, key, auth }) =>
            auth && (
              <TagItem
                key={key}
                color={color}
                text={text}
                bordered={activeTag === key}
                onClick={() => {
                  setActiveTag(activeTag !== key ? key : "none");
                  resetForm();
                }}
              />
            )
        )}
      </div>
      {activeTag === "none" ? (
        <SearchExport info={{ key: "none", text: "讨喜报表" }} />
      ) : (
        <SearchExport
          info={
            TAGS.find((value) => value.key === activeTag) || {
              key: "none",
              text: "讨喜报表",
            }
          }
        />
      )}
    </>
  );
};

export default Tag;
