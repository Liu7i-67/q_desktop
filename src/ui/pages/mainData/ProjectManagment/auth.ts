import UserHelper from "@/utils/user-helper";

class _ProjectManagementAuth {
  private static _instance: _ProjectManagementAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_ProjectManagementAuth._instance) {
      _ProjectManagementAuth._instance = new _ProjectManagementAuth(
        UserHelper.getInstance()
      );
    }
    return _ProjectManagementAuth._instance;
  }

  /**
   * @projectView 查看医美项目
   */
  get projectView() {
    return this.userHelper.checkPermission("projectView");
  }

  /**
   * @projectCreate 新增医美项目
   */
  get projectCreate() {
    return this.userHelper.checkPermission("projectCreate");
  }

  /**
   * @projectUpdate 修改医美项目
   */
  get projectUpdate() {
    return this.userHelper.checkPermission("projectUpdate");
  }

  /**
   * @projectTypeCreate 新增医美项目分类
   */
  get projectTypeCreate() {
    return this.userHelper.checkPermission("projectTypeCreate");
  }

  /**
   * @projectTypeUpdate 修改医美项目分类
   */
  get projectTypeUpdate() {
    return this.userHelper.checkPermission("projectTypeUpdate");
  }
}

// 导出单例
export const ProjectManagementAuth = _ProjectManagementAuth.instance;
