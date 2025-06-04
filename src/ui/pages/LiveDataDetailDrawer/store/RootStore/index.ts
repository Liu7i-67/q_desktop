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
import { ILiveDataDetailDrawerProps } from "../../interface";
import { ILiveDataDetailSecondDrawerRef } from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDetailSecondDrawer/interface";
import { ILiveDataDealDrawerRef } from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDealDrawer/interface";
import { useRef } from "react";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<ILiveDataDetailDrawerProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<ILiveDataDetailDrawerProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const secondDrawerRef = useRef<ILiveDataDetailSecondDrawerRef>(null);
  const dealDrawerRef = useRef<ILiveDataDealDrawerRef>(null);
  return useLocalObservable(
    () => new RootStore({ secondDrawerRef, dealDrawerRef })
  );
});
