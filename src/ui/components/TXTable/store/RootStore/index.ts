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
import { ITXTableProps } from "../../interface";
import { ITXColumnsSettingModalRef } from "../../TXColumnsSettingModal/interface";
import { useRef } from "react";
import { IObj } from "@/utils/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITXTableProps<IObj>>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<ITXTableProps<IObj>>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const settingRef = useRef<ITXColumnsSettingModalRef>(null);
  return useLocalObservable(() => new RootStore({ settingRef }));
});
