import UserHelper from "@/utils/user-helper";

class _DictAuth {
  private static _instance: _DictAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_DictAuth._instance) {
      _DictAuth._instance = new _DictAuth(UserHelper.getInstance());
    }
    return _DictAuth._instance;
  }

  /**
   * @dictView 查看字典
   */
  get dictView() {
    return this.userHelper.checkPermission("dictView");
  }

  /**
   * @dictCreate 新增字典
   */
  get dictCreate() {
    return this.userHelper.checkPermission("dictCreate");
  }

  /**
   * @dictUpdate 修改字典
   */
  get dictUpdate() {
    return this.userHelper.checkPermission("dictUpdate");
  }
}

// 导出单例
export const DictAuth = _DictAuth.instance;
