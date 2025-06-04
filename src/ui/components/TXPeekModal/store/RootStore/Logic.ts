import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IInitData } from "../../interface";
import { get_repeat_user } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  repeatData: IResBusinessV1CustomerPeek | null = null;
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
      this.repeatData = res?.data;
    });
  }
}
