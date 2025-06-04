import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from ".";
import { IResBaseV1PlatformProjectTypeTreeAndChild } from "@/service/base/v1/project-type/tree-and-child";
export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get submitLoading() {
    return (
      this.rootStore.loadingStore.get("updateCustomer") ||
      this.rootStore.loadingStore.get("addCustomer")
    );
  }
}
