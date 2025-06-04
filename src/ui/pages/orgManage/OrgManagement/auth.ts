import UserHelper from "@/utils/user-helper";

class _OrganizationAuth {
  private static _instance: _OrganizationAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_OrganizationAuth._instance) {
      _OrganizationAuth._instance = new _OrganizationAuth(
        UserHelper.getInstance()
      );
    }
    return _OrganizationAuth._instance;
  }

  /**
   * @organizationView 查看机构
   */
  get organizationView() {
    return this.userHelper.checkPermission("organizationView");
  }

  /**
   * @organizationCreate 新增机构
   */
  get organizationCreate() {
    return this.userHelper.checkPermission("organizationCreate");
  }

  /**
   * @organizationUpdate 修改机构
   */
  get organizationUpdate() {
    return this.userHelper.checkPermission("organizationUpdate");
  }

  /**
   * @organizationTypeCreate 新增机构分类
   */
  get organizationTypeCreate() {
    return this.userHelper.checkPermission("organizationTypeCreate");
  }

  /**
   * @organizationTypeUpdate 修改机构分类
   */
  get organizationTypeUpdate() {
    return this.userHelper.checkPermission("organizationTypeUpdate");
  }

  /**
   * @organizationTypeDelete 删除机构分类
   */
  get organizationTypeDelete() {
    return this.userHelper.checkPermission("organizationTypeDelete");
  }
}

// 导出单例
export const OrganizationAuth = _OrganizationAuth.instance;
