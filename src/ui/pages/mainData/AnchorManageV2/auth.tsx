import UserHelper from "@/utils/user-helper";

class _LiveStreamerAuth {
  private static _instance: _LiveStreamerAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_LiveStreamerAuth._instance) {
      _LiveStreamerAuth._instance = new _LiveStreamerAuth(
        UserHelper.getInstance()
      );
    }
    return _LiveStreamerAuth._instance;
  }

  /**
   * @function 查看主播
   */
  get liveStreamerView() {
    return this.userHelper.checkPermission("liveStreamerView");
  }

  /**
   * @function 新增主播
   */
  get liveStreamerCreate() {
    return this.userHelper.checkPermission("liveStreamerCreate");
  }

  /**
   * @function 修改主播
   */
  get liveStreamerUpdate() {
    return this.userHelper.checkPermission("liveStreamerUpdate");
  }
}

// 导出单例
export const LiveStreamerAuth = _LiveStreamerAuth.instance;
