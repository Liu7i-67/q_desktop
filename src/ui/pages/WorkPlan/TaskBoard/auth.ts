import UserHelper from "@/utils/user-helper";

class _TaskBoardAuth {
  private static _instance: _TaskBoardAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_TaskBoardAuth._instance) {
      _TaskBoardAuth._instance = new _TaskBoardAuth(UserHelper.getInstance());
    }
    return _TaskBoardAuth._instance;
  }

  /** @param demo权限 */
  get demo() {
    return this.userHelper.checkPermission("demo");
  }
}

export const TaskBoardAuth = _TaskBoardAuth.instance;
