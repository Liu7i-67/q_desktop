import UserHelper from "@/utils/user-helper";

class _UserChannelRelationAuth {
  private static _instance: _UserChannelRelationAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_UserChannelRelationAuth._instance) {
      _UserChannelRelationAuth._instance = new _UserChannelRelationAuth(
        UserHelper.getInstance()
      );
    }
    return _UserChannelRelationAuth._instance;
  }

  /**
   * @userChannelRelationView 查看绑定关系
   */
  get userChannelRelationView() {
    return this.userHelper.checkPermission("userChannelRelationView");
  }

  /**
   * @userChannelRelationCreate 新增绑定关系
   */
  get userChannelRelationCreate() {
    return this.userHelper.checkPermission("userChannelRelationCreate");
  }

  /**
   * @userChannelRelationUpdate 修改绑定关系
   */
  get userChannelRelationUpdate() {
    return this.userHelper.checkPermission("userChannelRelationUpdate");
  }

  /**
   * @userChannelRelationDelete 删除绑定关系
   */
  get userChannelRelationDelete() {
    return this.userHelper.checkPermission("userChannelRelationDelete");
  }
}

// 导出单例
export const UserChannelRelationAuth = _UserChannelRelationAuth.instance;
