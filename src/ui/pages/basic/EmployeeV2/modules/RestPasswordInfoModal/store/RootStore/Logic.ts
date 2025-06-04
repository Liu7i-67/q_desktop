import { handleCopy } from "@/utils/tools";
import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IInitData } from "../../interface";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    this.open = false;
    this.initData = null;
  }

  onCopyPassword() {
    const password = this.initData?.password;
    if (password) {
      handleCopy(password);
    }
  }
}
