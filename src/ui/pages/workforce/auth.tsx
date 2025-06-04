import UserHelper from "@/utils/user-helper";

class _RedBookSchedulingAuth {
  private static _instance: _RedBookSchedulingAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_RedBookSchedulingAuth._instance) {
      _RedBookSchedulingAuth._instance = new _RedBookSchedulingAuth(
        UserHelper.getInstance()
      );
    }
    return _RedBookSchedulingAuth._instance;
  }

  /**
   * @redBookSchedulingView 查看排班
   */
  get redBookSchedulingView() {
    return this.userHelper.checkPermission("redBookSchedulingView");
  }

  /**
   * @redBookSchedulingUpdate 编辑排班
   */
  get redBookSchedulingUpdate() {
    return this.userHelper.checkPermission("redBookSchedulingUpdate");
  }

  /**
   * @redBookSchedulingShiftView 查看班次
   */
  get redBookSchedulingShiftView() {
    return this.userHelper.checkPermission("redBookSchedulingShiftView");
  }

  /**
   * @redBookSchedulingShiftCreate 新增班次
   */
  get redBookSchedulingShiftCreate() {
    return this.userHelper.checkPermission("redBookSchedulingShiftCreate");
  }

  /**
   * @redBookSchedulingShiftUpdate 修改班次
   */
  get redBookSchedulingShiftUpdate() {
    return this.userHelper.checkPermission("redBookSchedulingShiftUpdate");
  }

  /**
   * @redBookSchedulingShiftDelete 删除班次
   */
  get redBookSchedulingShiftDelete() {
    return this.userHelper.checkPermission("redBookSchedulingShiftDelete");
  }
}

// 导出单例
export const RedBookSchedulingAuth = _RedBookSchedulingAuth.instance;
