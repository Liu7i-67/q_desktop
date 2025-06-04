import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getList");
  }

  get dateLoading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getListByData");
  }
}
