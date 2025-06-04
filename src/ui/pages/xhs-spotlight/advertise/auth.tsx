import UserHelper from "@/utils/user-helper";

class _AdvertiserManagementAuth {
  private static _instance: _AdvertiserManagementAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_AdvertiserManagementAuth._instance) {
      _AdvertiserManagementAuth._instance = new _AdvertiserManagementAuth(
        UserHelper.getInstance()
      );
    }
    return _AdvertiserManagementAuth._instance;
  }

  /**
   * @advertiserManagementView 查看
   */
  get advertiserManagementView() {
    return this.userHelper.checkPermission("advertiserManagementView");
  }

  /**
   * @advertiserManagementCreate 新增
   */
  get advertiserManagementCreate() {
    return this.userHelper.checkPermission("advertiserManagementCreate");
  }

  /**
   * @advertiserManagementUpdate 修改
   */
  get advertiserManagementUpdate() {
    return this.userHelper.checkPermission("advertiserManagementUpdate");
  }

  /**
   * @advertiserManagementDelete 删除
   */
  get advertiserManagementDelete() {
    return this.userHelper.checkPermission("advertiserManagementDelete");
  }
}

// 导出单例
export const AdvertiserManagementAuth = _AdvertiserManagementAuth.instance;
