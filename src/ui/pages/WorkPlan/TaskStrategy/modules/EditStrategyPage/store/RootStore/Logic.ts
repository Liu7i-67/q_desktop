import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  stepCurrent: number = 0;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSetStepCurrent(step: number) {
    this.stepCurrent = step;
  }
}
