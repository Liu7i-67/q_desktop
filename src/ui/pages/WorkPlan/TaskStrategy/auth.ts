import UserHelper from "@/utils/user-helper";

class _TaskStrategyAuth {
  private static _instance: _TaskStrategyAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_TaskStrategyAuth._instance) {
      _TaskStrategyAuth._instance = new _TaskStrategyAuth(
        UserHelper.getInstance()
      );
    }
    return _TaskStrategyAuth._instance;
  }

  /** @param 查看 */
  get taskStrategyView() {
    return this.userHelper.checkPermission("taskStrategyView");
  }

  /** @param 新增 */
  get taskStrategyCreate() {
    return this.userHelper.checkPermission("taskStrategyCreate");
  }

  /** @param 编辑 */
  get taskStrategyUpdate() {
    return this.userHelper.checkPermission("taskStrategyUpdate");
  }
}

export const TaskStrategyAuth = _TaskStrategyAuth.instance;
