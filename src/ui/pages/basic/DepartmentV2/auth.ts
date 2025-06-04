import UserHelper from "@/utils/user-helper";

class _DepartmentAuth {
  private static _instance: _DepartmentAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_DepartmentAuth._instance) {
      _DepartmentAuth._instance = new _DepartmentAuth(UserHelper.getInstance());
    }
    return _DepartmentAuth._instance;
  }

  /**
   * @deptView 查看部门
   */
  get deptView() {
    return this.userHelper.checkPermission("deptView");
  }

  /**
   * @deptCreate 新增部门
   */
  get deptCreate() {
    return this.userHelper.checkPermission("deptCreate");
  }

  /**
   * @deptUpdate 修改部门
   */
  get deptUpdate() {
    return this.userHelper.checkPermission("deptUpdate");
  }
}

// 导出单例
export const DepartmentAuth = _DepartmentAuth.instance;
