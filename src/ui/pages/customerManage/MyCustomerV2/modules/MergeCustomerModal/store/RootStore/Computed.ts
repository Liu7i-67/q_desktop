import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get onMergeCustomerSearchLoading() {
    return this.rootStore.loadingStore.get("onMergeCustomerSearch");
  }
  get confirmMergeCustomerLoading() {
    return this.rootStore.loadingStore.get("handleConfirmMergeCustomer");
  }
}
