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

  /**
   * @customerView 查看客户
   */
  get customerView() {
    return this.userHelper.checkPermission("customerView");
  }

  /**
   * @customerCreate 新增客户
   */
  get customerCreate() {
    return this.userHelper.checkPermission("customerCreate");
  }

  /**
   * @customerUpdate 客户编辑
   */
  get customerUpdate() {
    return this.userHelper.checkPermission("customerUpdate");
  }

  /**
   * @customerCollab 客户协作
   */
  get customerCollab() {
    return this.userHelper.checkPermission("customerCollab");
  }

  /**
   * @customerDispatch 客户派单
   */
  get customerDispatch() {
    return this.userHelper.checkPermission("customerDispatch");
  }

  /**
   * @customerTransfer 客户转移
   */
  get customerTransfer() {
    return this.userHelper.checkPermission("customerTransfer");
  }

  /**
   * @customerMerge 客户合并
   */
  get customerMerge() {
    return this.userHelper.checkPermission("customerMerge");
  }

  /**
   * @customerMerge 删除派单
   */
  get customerDispatchDelete() {
    return this.userHelper.checkPermission("customerDispatchDelete");
  }
}

// 导出单例
export const MyCustomerAuth = _MyCustomerAuth.instance;
