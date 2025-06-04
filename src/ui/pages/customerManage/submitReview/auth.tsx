import UserHelper from "@/utils/user-helper";

class _PendingReviewDealAuth {
  private static _instance: _PendingReviewDealAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_PendingReviewDealAuth._instance) {
      _PendingReviewDealAuth._instance = new _PendingReviewDealAuth(
        UserHelper.getInstance()
      );
    }
    return _PendingReviewDealAuth._instance;
  }

  /**
   * @pendingReviewDealView 查看
   */
  get pendingReviewDealView() {
    return this.userHelper.checkPermission("pendingReviewDealView");
  }

  /**
   * @pendingReviewDealreview 审查
   */
  get pendingReviewDealreview() {
    return this.userHelper.checkPermission("pendingReviewDealreview");
  }
}

// 导出单例
export const PendingReviewDealAuth = _PendingReviewDealAuth.instance;
