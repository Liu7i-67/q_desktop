import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { ILiveDataV2Props } from "../../interface";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ILiveDataDetailDrawerRef } from "@/pages/LiveDataDetailDrawer/interface";
import { ILiveDataDetailSecondDrawerRef } from "../../modules/LiveDataDetailSecondDrawer/interface";
import { useRef } from "react";
import { ILiveDataDealDrawerRef } from "../../modules/LiveDataDealDrawer/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ILiveDataV2Props>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const detailRef = useRef<ILiveDataDetailDrawerRef>(null);
  const secondDetailRef = useRef<ILiveDataDetailSecondDrawerRef>(null);
  const dealRef = useRef<ILiveDataDealDrawerRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        detailRef,
        secondDetailRef,
        dealRef,
      })
  );
});
