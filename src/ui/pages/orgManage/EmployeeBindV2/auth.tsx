import UserHelper from "@/utils/user-helper";

class _EmployeeBindAuth {
  private static _instance: _EmployeeBindAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_EmployeeBindAuth._instance) {
      _EmployeeBindAuth._instance = new _EmployeeBindAuth(
        UserHelper.getInstance()
      );
    }
    return _EmployeeBindAuth._instance;
  }

  /**
   * @userOrgRelationView 查看绑定关系
   */
  get userOrgRelationView() {
    return this.userHelper.checkPermission("userOrgRelationView");
  }

  /**
   * @userOrgRelationCreate 新增绑定关系
   */
  get userOrgRelationCreate() {
    return this.userHelper.checkPermission("userOrgRelationCreate");
  }

  /**
   * @userOrgRelationUpdate 修改绑定关系
   */
  get userOrgRelationUpdate() {
    return this.userHelper.checkPermission("userOrgRelationUpdate");
  }

  /**
   * @userOrgRelationDelete 删除绑定关系
   */
  get userOrgRelationDelete() {
    return this.userHelper.checkPermission("userOrgRelationDelete");
  }
}

// 导出单例
export const EmployeeBindAuth = _EmployeeBindAuth.instance;
