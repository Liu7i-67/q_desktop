import UserHelper from "@/utils/user-helper";

class _CustomerDrawerAuth {
  private static _instance: _CustomerDrawerAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_CustomerDrawerAuth._instance) {
      _CustomerDrawerAuth._instance = new _CustomerDrawerAuth(
        UserHelper.getInstance()
      );
    }
    return _CustomerDrawerAuth._instance;
  }

  /** @param 删除成交记录 */
  get customerDealDelete() {
    return this.userHelper.checkPermission("customerDealDelete");
  }
}

export const CustomerDrawerAuth = _CustomerDrawerAuth.instance;
