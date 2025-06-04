import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";
import { IOption } from "@/utils/interface";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get phoneOptions() {
    const { logic } = this.rootStore;
    const item: IOption[] = [];
    for (let p of logic.initData?.phoneNumber || []) {
      item.push({
        label: p,
        value: p,
      });
    }
    return item;
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return (
      loadingStore.get("getAvailableOrg") ||
      loadingStore.get("getProjectTree") ||
      loadingStore.get("submit")
    );
  }
}
