import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get initLoading() {
    const { loadingStore } = this.rootStore;
    return (
      loadingStore.get("getDetail") ||
      loadingStore.get("customerDealConfirm") ||
      loadingStore.get("cancelDealCancel")
    );
  }

  get subTitle() {
    const { logic } = this.rootStore;
    switch (logic.activeKey) {
      case "COMFIRM": {
        return "确认成交";
      }
      case "CANCEL": {
        return "取消成交";
      }
      default: {
        return "";
      }
    }
  }
}
