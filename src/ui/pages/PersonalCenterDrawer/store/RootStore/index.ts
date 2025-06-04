import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPersonalCenterDrawerProps } from "../../interface";
import { useRef } from "react";
import { IEditNicknameModalRef } from "../../EditNicknameModal/interface";
import { IEditPasswordModalRef } from "../../EditPasswordModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IPersonalCenterDrawerProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IPersonalCenterDrawerProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const nickRef = useRef<IEditNicknameModalRef>(null);
  const passwordRef = useRef<IEditPasswordModalRef>(null);

  return useLocalObservable(() => new RootStore({ nickRef, passwordRef }));
});
