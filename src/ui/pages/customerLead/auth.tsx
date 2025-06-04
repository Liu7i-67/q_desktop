import UserHelper from "@/utils/user-helper";

class _CustomerLeadsAuth {
  private static _instance: _CustomerLeadsAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_CustomerLeadsAuth._instance) {
      _CustomerLeadsAuth._instance = new _CustomerLeadsAuth(
        UserHelper.getInstance()
      );
    }
    return _CustomerLeadsAuth._instance;
  }

  /**
   * @customerLeadsView 查看线索
   */
  get customerLeadsView() {
    return this.userHelper.checkPermission("customerLeadsView");
  }

  /**
   * @customerLeadsCreate 新增线索
   */
  get customerLeadsCreate() {
    return this.userHelper.checkPermission("customerLeadsCreate");
  }

  /**
   * @customerLeadsUpdate 修改线索
   */
  get customerLeadsUpdate() {
    return this.userHelper.checkPermission("customerLeadsUpdate");
  }

  /**
   * @customerLeadsDelete 删除线索
   */
  get customerLeadsDelete() {
    return this.userHelper.checkPermission("customerLeadsDelete");
  }

  /**
   * @customerLeadsAssign 指派线索
   */
  get customerLeadsAssign() {
    return this.userHelper.checkPermission("customerLeadsAssign");
  }
}

// 导出单例
export const CustomerLeadsAuth = _CustomerLeadsAuth.instance;
