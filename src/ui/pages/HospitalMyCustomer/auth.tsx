import UserHelper from "@/utils/user-helper";

class _InstitutionalCustomerAuth {
  private static _instance: _InstitutionalCustomerAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_InstitutionalCustomerAuth._instance) {
      _InstitutionalCustomerAuth._instance = new _InstitutionalCustomerAuth(
        UserHelper.getInstance()
      );
    }
    return _InstitutionalCustomerAuth._instance;
  }

  /** @param 查看客户 */
  get institutionalCustomerView() {
    return this.userHelper.checkPermission("institutionalCustomerView");
  }

  /** @param 派单处理 */
  get InstitutionalCustomerHandle() {
    return this.userHelper.checkPermission("InstitutionalCustomerHandle");
  }

  /** @param 机构处理历史 */
  get institutionalCustomerHandleHistory() {
    return this.userHelper.checkPermission(
      "institutionalCustomerHandleHistory"
    );
  }

  /** @param 平台留言历史 */
  get institutionalCustomerMessageHistory() {
    return this.userHelper.checkPermission(
      "institutionalCustomerMessageHistory"
    );
  }
}

// 导出单例
export const InstitutionalCustomerAuth = _InstitutionalCustomerAuth.instance;
