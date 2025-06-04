import UserHelper from "@/utils/user-helper";

class _UserAuth {
  private static _instance: _UserAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_UserAuth._instance) {
      _UserAuth._instance = new _UserAuth(UserHelper.getInstance());
    }
    return _UserAuth._instance;
  }

  /**
   * @userView 查看员工
   */
  get userView() {
    return this.userHelper.checkPermission("userView");
  }

  /**
   * @userCreate 新增员工
   */
  get userCreate() {
    return this.userHelper.checkPermission("userCreate");
  }

  /**
   * @userUpdate 修改员工
   */
  get userUpdate() {
    return this.userHelper.checkPermission("userUpdate");
  }
}

// 导出单例
export const UserAuth = _UserAuth.instance;
