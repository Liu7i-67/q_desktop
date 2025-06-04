import UserHelper from "@/utils/user-helper";

class _SchedulingManagementAuth {
  private static _instance: _SchedulingManagementAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_SchedulingManagementAuth._instance) {
      _SchedulingManagementAuth._instance = new _SchedulingManagementAuth(
        UserHelper.getInstance()
      );
    }
    return _SchedulingManagementAuth._instance;
  }

  /** @param 新增分组 */
  get redBookChannelGroupCreate() {
    return this.userHelper.checkPermission("redBookChannelGroupCreate");
  }

  /** @param 修改分组 */
  get redBookChannelGroupUpdate() {
    return this.userHelper.checkPermission("redBookChannelGroupUpdate");
  }
  /** @param  删除分组 */
  get redBookChannelGroupDelete() {
    return this.userHelper.checkPermission("redBookChannelGroupDelete");
  }
}

// 导出单例
export const SchedulingManagementAuth = _SchedulingManagementAuth.instance;
