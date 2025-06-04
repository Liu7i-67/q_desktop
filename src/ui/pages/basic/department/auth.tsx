import UserHelper from "@/utils/user-helper";

class _DeptAuth {
  private static _instance: _DeptAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_DeptAuth._instance) {
      _DeptAuth._instance = new _DeptAuth(UserHelper.getInstance());
    }
    return _DeptAuth._instance;
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
export const DeptAuth = _DeptAuth.instance;
