import UserHelper from "@/utils/user-helper";

class __TeamAuth {
  private static _instance: __TeamAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!__TeamAuth._instance) {
      __TeamAuth._instance = new __TeamAuth(UserHelper.getInstance());
    }
    return __TeamAuth._instance;
  }

  /** @function 团队详情*/
  get teamPerformance_teamDetail() {
    return this.userHelper.checkPermission("teamPerformance_teamDetail");
  }

  /** @function 渠道详情*/
  get teamPerformance_channelDetail() {
    return this.userHelper.checkPermission("teamPerformance_channelDetail");
  }

  /** @function 成交详情*/
  get teamPerformance_personalDetail() {
    return this.userHelper.checkPermission("teamPerformance_personalDetail");
  }
}

// 导出单例
export const TeamAuth = __TeamAuth.instance;
