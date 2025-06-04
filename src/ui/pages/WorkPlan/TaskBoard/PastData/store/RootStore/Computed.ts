import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { IComputed } from "./interface";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get totalLoading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getTotal");
  }
}
