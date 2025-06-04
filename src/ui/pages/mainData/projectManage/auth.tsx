import UserHelper from "@/utils/user-helper";

class _ProjectAuth {
  private static _instance: _ProjectAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_ProjectAuth._instance) {
      _ProjectAuth._instance = new _ProjectAuth(UserHelper.getInstance());
    }
    return _ProjectAuth._instance;
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
export const ProjectAuth = _ProjectAuth.instance;
