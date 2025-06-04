import UserHelper from "@/utils/user-helper";

class _ReportFormsAuth {
  private static _instance: _ReportFormsAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_ReportFormsAuth._instance) {
      _ReportFormsAuth._instance = new _ReportFormsAuth(
        UserHelper.getInstance()
      );
    }
    return _ReportFormsAuth._instance;
  }

  /**
   * @orgRegionBusinessReport 机构地区商务日表
   */
  get orgRegionBusinessReport() {
    return this.userHelper.checkPermission("orgRegionBusinessReport");
  }

  /**
   * @customerRegionBusinessReport 客户地区商务日表
   */
  get customerRegionBusinessReport() {
    return this.userHelper.checkPermission("customerRegionBusinessReport");
  }

  /**
   * @businessWeekReport 商务周表
   */
  get businessWeekReport() {
    return this.userHelper.checkPermission("businessWeekReport");
  }

  /**
   * @businessMonthReport 商务月表
   */
  get businessMonthReport() {
    return this.userHelper.checkPermission("businessMonthReport");
  }

  /**
   * @littleRedBookDiversionReport 小红书分流表
   */
  get littleRedBookDiversionReport() {
    return this.userHelper.checkPermission("littleRedBookDiversionReport");
  }

  /**
   * @littleRedBookPushReport 小红书投放监测表
   */
  get littleRedBookPushReport() {
    return this.userHelper.checkPermission("littleRedBookPushReport");
  }

  /**
   * @littleRedBookPushReport OA渠道客资监测表
   */
  get oaChannelMonitoring() {
    return this.userHelper.checkPermission("oaChannelMonitoring");
  }

  /**
   * @personalPerformanceDetailReport 个人业绩明细表
   */
  get personalPerformanceDetailReport() {
    return this.userHelper.checkPermission("personalPerformanceDetailReport");
  }

  /**
   * @teamPerformanceDetailReport 团队业绩明细表
   */
  get teamPerformanceDetailReport() {
    return this.userHelper.checkPermission("teamPerformanceDetailReport");
  }

  /**
   * @teamPerformanceSummaryReport 团队业绩总览表
   */
  get teamPerformanceSummaryReport() {
    return this.userHelper.checkPermission("teamPerformanceSummaryReport");
  }

  /**
   * @teamPersonalPerformanceDetailReport 团队业绩组内明细表
   */
  get teamPersonalPerformanceDetailReport() {
    return this.userHelper.checkPermission(
      "teamPersonalPerformanceDetailReport"
    );
  }
  /**
   * @teamPersonalPerformanceSummaryReport 个人留资数据表
   */
  get individualRetention() {
    return this.userHelper.checkPermission("individualRetention");
  }
}

// 导出单例
export const ReportFormsAuth = _ReportFormsAuth.instance;
