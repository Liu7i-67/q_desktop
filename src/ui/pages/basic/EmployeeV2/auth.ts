import UserHelper from "@/utils/user-helper";

class _EmployeeAuth {
  private static _instance: _EmployeeAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_EmployeeAuth._instance) {
      _EmployeeAuth._instance = new _EmployeeAuth(UserHelper.getInstance());
    }
    return _EmployeeAuth._instance;
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
export const EmployeeAuth = _EmployeeAuth.instance;
