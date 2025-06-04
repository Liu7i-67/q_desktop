import UserHelper from "@/utils/user-helper";

class _ThreadLisAuth {
  private static _instance: _ThreadLisAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_ThreadLisAuth._instance) {
      _ThreadLisAuth._instance = new _ThreadLisAuth(UserHelper.getInstance());
    }
    return _ThreadLisAuth._instance;
  }

  /**
   * @littleRedBookLeadsView 查看
   */
  get littleRedBookLeadsView() {
    return this.userHelper.checkPermission("littleRedBookLeadsView");
  }

  /**
   * @littleRedBookLeadsExport 导出
   */
  get littleRedBookLeadsExport() {
    return this.userHelper.checkPermission("littleRedBookLeadsExport");
  }
}

// 导出单例
export const ThreadLisAuth = _ThreadLisAuth.instance;
