import UserHelper from "@/utils/user-helper";

class _WorkbenchAuth {
  private static _instance: _WorkbenchAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_WorkbenchAuth._instance) {
      _WorkbenchAuth._instance = new _WorkbenchAuth(UserHelper.getInstance());
    }
    return _WorkbenchAuth._instance;
  }

  /** @param 今日跟进 */
  get todayFollow() {
    return this.userHelper.checkPermission("todayFollow");
  }

  /** @param 工作台 */
  get workSpace() {
    return this.userHelper.checkPermission("workSpace");
  }

  /** @param 个人业绩 */
  get personalPerformance() {
    return this.userHelper.checkPermission("personalPerformance");
  }

  /** @param 团队业绩 */
  get teamPerformance() {
    return this.userHelper.checkPermission("teamPerformance");
  }
}

export const WorkbenchAuth = _WorkbenchAuth.instance;
