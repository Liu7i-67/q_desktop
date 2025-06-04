import UserHelper from "@/utils/user-helper";

class _PlatformAuth {
  private static _instance: _PlatformAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_PlatformAuth._instance) {
      _PlatformAuth._instance = new _PlatformAuth(UserHelper.getInstance());
    }
    return _PlatformAuth._instance;
  }

  /**
   * @platformView 查看平台
   */
  get platformView() {
    return this.userHelper.checkPermission("platformView");
  }

  /**
   * @platformCreate 新增平台
   */
  get platformCreate() {
    return this.userHelper.checkPermission("platformCreate");
  }

  /**
   * @platformUpdate 修改平台
   */
  get platformUpdate() {
    return this.userHelper.checkPermission("platformUpdate");
  }
}

// 导出单例
export const PlatformAuth = _PlatformAuth.instance;
