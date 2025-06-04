import UserHelper from "@/utils/user-helper";

class _RoleAuth {
  private static _instance: _RoleAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_RoleAuth._instance) {
      _RoleAuth._instance = new _RoleAuth(UserHelper.getInstance());
    }
    return _RoleAuth._instance;
  }

  /**
   * @roleView 查看角色
   */
  get roleView() {
    return this.userHelper.checkPermission("roleView");
  }

  /**
   * @roleCreate 新增角色
   */
  get roleCreate() {
    return this.userHelper.checkPermission("roleCreate");
  }

  /**
   * @roleUpdate 修改角色
   */
  get roleUpdate() {
    return this.userHelper.checkPermission("roleUpdate");
  }
}

// 导出单例
export const RoleAuth = _RoleAuth.instance;
