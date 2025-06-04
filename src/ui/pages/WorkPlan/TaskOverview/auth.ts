import UserHelper from "@/utils/user-helper";

class _TaskOverviewAuth {
  private static _instance: _TaskOverviewAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_TaskOverviewAuth._instance) {
      _TaskOverviewAuth._instance = new _TaskOverviewAuth(
        UserHelper.getInstance()
      );
    }
    return _TaskOverviewAuth._instance;
  }

  /** @param 取消任务 */
  get taskOverviewCancelTask() {
    return this.userHelper.checkPermission("taskOverviewCancelTask");
  }
}

export const TaskOverviewAuth = _TaskOverviewAuth.instance;
