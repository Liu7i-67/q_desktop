import UserHelper from "@/utils/user-helper";

class _DictionaryV2Auth {
  private static _instance: _DictionaryV2Auth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_DictionaryV2Auth._instance) {
      _DictionaryV2Auth._instance = new _DictionaryV2Auth(
        UserHelper.getInstance()
      );
    }
    return _DictionaryV2Auth._instance;
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
export const DictionaryV2Auth = _DictionaryV2Auth.instance;
