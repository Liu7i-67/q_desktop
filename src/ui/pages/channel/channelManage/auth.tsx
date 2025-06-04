import UserHelper from "@/utils/user-helper";

class _ChannelAuth {
  private static _instance: _ChannelAuth;

  constructor(private userHelper: UserHelper) {}

  static get instance() {
    if (!_ChannelAuth._instance) {
      _ChannelAuth._instance = new _ChannelAuth(UserHelper.getInstance());
    }
    return _ChannelAuth._instance;
  }

  /**
   * @channelView 查看渠道
   */
  get channelView() {
    return this.userHelper.checkPermission("channelView");
  }

  /**
   * @channelCreate 新增渠道
   */
  get channelCreate() {
    return this.userHelper.checkPermission("channelCreate");
  }

  /**
   * @channelUpdate 修改渠道
   */
  get channelUpdate() {
    return this.userHelper.checkPermission("channelUpdate");
  }

  /**
   * @channelTypeCreate 新增渠道分类
   */
  get channelTypeCreate() {
    return this.userHelper.checkPermission("channelTypeCreate");
  }

  /**
   * @channelTypeUpdate 修改渠道管理
   */
  get channelTypeUpdate() {
    return this.userHelper.checkPermission("channelTypeUpdate");
  }
}

// 导出单例
export const ChannelAuth = _ChannelAuth.instance;
