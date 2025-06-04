import UserHelper from "@/utils/user-helper";

class _CustomerAssiginAuth {
  private static _instance: _CustomerAssiginAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_CustomerAssiginAuth._instance) {
      _CustomerAssiginAuth._instance = new _CustomerAssiginAuth(
        UserHelper.getInstance()
      );
    }
    return _CustomerAssiginAuth._instance;
  }

  /** @function 查看*/
  get customerAssignTaskView() {
    return this.userHelper.checkPermission("customerAssignTaskView");
  }

  /** @function 指派*/
  get customerAssignTaskAssign() {
    return this.userHelper.checkPermission("customerAssignTaskAssign");
  }
  /** @function 转移客户*/
  get customerAssignTransfer() {
    return this.userHelper.checkPermission("customerAssignTransfer");
  }
  /** @function 编辑客户 */
  get customerAssignUpdate() {
    return this.userHelper.checkPermission("customerAssignUpdate");
  }
}

// 导出单例
export const CustomerAssiginAuth = _CustomerAssiginAuth.instance;
