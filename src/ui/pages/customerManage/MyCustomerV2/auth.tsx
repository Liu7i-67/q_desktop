import UserHelper from "@/utils/user-helper";

class _MyCustomerAuth {
  private static _instance: _MyCustomerAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_MyCustomerAuth._instance) {
      _MyCustomerAuth._instance = new _MyCustomerAuth(UserHelper.getInstance());
    }
    return _MyCustomerAuth._instance;
  }

  /** @function 查看客户*/
  get customerView() {
    return this.userHelper.checkPermission("customerView");
  }

  /** @function 新增客户*/
  get customerCreate() {
    return this.userHelper.checkPermission("customerCreate");
  }

  /** @function 客户编辑*/
  get customerUpdate() {
    return this.userHelper.checkPermission("customerUpdate");
  }

  /** @function 客户协作*/
  get customerCollab() {
    return this.userHelper.checkPermission("customerCollab");
  }

  /** @function 客户派单*/
  get customerDispatch() {
    return this.userHelper.checkPermission("customerDispatch");
  }

  /** @function 客户转移*/
  get customerTransfer() {
    return this.userHelper.checkPermission("customerTransfer");
  }

  /** @function 客户合并*/
  get customerMerge() {
    return this.userHelper.checkPermission("customerMerge");
  }

  /** @function 删除派单*/
  get customerDispatchDelete() {
    return this.userHelper.checkPermission("customerDispatchDelete");
  }
}

// 导出单例
export const MyCustomerAuth = _MyCustomerAuth.instance;
