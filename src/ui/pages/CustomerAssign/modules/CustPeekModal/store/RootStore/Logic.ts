import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IResBusinessV1CustomerPeek | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IResBusinessV1CustomerPeek) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    propsStore.props.afterClose?.();
  }
}
