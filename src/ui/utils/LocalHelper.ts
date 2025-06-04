export interface ILocalDiy {
  tx_api: string;
  /** @param 是否绕过版本号校验 */
  bypassVersion: boolean;
}

class LocalHelper {
  static instance: LocalHelper | null = null;
  /** @param diy设置 */
  diy: ILocalDiy | null = null;

  static getInstance() {
    if (!LocalHelper.instance) {
      LocalHelper.instance = new LocalHelper();
    }
    return LocalHelper.instance;
  }

  init() {
    try {
      const local = localStorage.getItem("tx_diy");
      if (!local) {
        return;
      }
      const localObj = JSON.parse(local);
      this.diy = localObj || null;
      console.log(`后端接口已映射至${this.diy?.tx_api}`);
    } catch (e) {
      console.error("后端接口映射失败: ", e);
    }
  }
}

export default LocalHelper;
