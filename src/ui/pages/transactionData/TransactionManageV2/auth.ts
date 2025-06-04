import UserHelper from "@/utils/user-helper";

class _DealManagementAuthV2 {
  private static _instance: _DealManagementAuthV2;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_DealManagementAuthV2._instance) {
      _DealManagementAuthV2._instance = new _DealManagementAuthV2(
        UserHelper.getInstance()
      );
    }
    return _DealManagementAuthV2._instance;
  }

  /**
   * @dealManagementView 查看
   */
  get dealManagementView() {
    return this.userHelper.checkPermission("dealManagementView");
  }

  /**
   * @dealManagementConfirm 确认
   */
  get dealManagementConfirm() {
    return this.userHelper.checkPermission("dealManagementConfirm");
  }

  /**
   * @dealManagementCancel 作废
   */
  get dealManagementCancel() {
    return this.userHelper.checkPermission("dealManagementCancel");
  }

  /**
   * @dealManagementDelete 删除
   */
  get dealManagementDelete() {
    return this.userHelper.checkPermission("dealManagementDelete");
  }

  /**
   * @dealManagementExport 导出
   */
  get dealManagementExport() {
    return this.userHelper.checkPermission("dealManagementExport");
  }

  /**
   * @dealManagementUpload 上传更新
   */
  get dealManagementUpload() {
    return this.userHelper.checkPermission("dealManagementUpload");
  }
}

// 导出单例
export const DealManagementAuthV2 = _DealManagementAuthV2.instance;
