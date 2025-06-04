import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { useRef } from "react";
import { IDictionaryConfigDrawerProps } from "../../interface";
import { IAddOrEditDictionaryValueModalRef } from "../../modules/AddOrEditDictionaryValueModal/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IDictionaryConfigDrawerProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IDictionaryConfigDrawerProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const addOrEditDictionaryValueModalRef =
    useRef<IAddOrEditDictionaryValueModalRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        addOrEditDictionaryValueModalRef,
      })
  );
});
