import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { IRepeatResult } from "@/pages/customerManage/MyCustomerV2/interface";
import { showErrorInfo, to } from "@/utils/tools";
import { get_repeat_user } from "../../service";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  repeatResult: IRepeatResult | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.repeat = withRequest(this.repeat, "repeat");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.repeat(initData?.keyword || "");
  }

  closeModal() {
    this.open = false;
    this.initData = null;
  }
  async repeat(keyword: string) {
    const [err, res] = await to(
      get_repeat_user({
        keyword,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.repeatResult = res?.data;
    });
  }
}
