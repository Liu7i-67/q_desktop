import UserHelper from "@/utils/user-helper";

class _AdvertisingPlanManagementAuth {
  private static _instance: _AdvertisingPlanManagementAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_AdvertisingPlanManagementAuth._instance) {
      _AdvertisingPlanManagementAuth._instance =
        new _AdvertisingPlanManagementAuth(UserHelper.getInstance());
    }
    return _AdvertisingPlanManagementAuth._instance;
  }

  /** @param 编辑 */
  get campaignUpdate() {
    return this.userHelper.checkPermission("campaignUpdate");
  }
}

export const AdvertisingPlanManagementAuth =
  _AdvertisingPlanManagementAuth.instance;
