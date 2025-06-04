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
import { ITransactionRecordProps } from "../../interface";
import { useRef } from "react";
import { IEditDealModalRef } from "@/pages/CustomerDrawer/EditDealModal/interface";
import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITransactionRecordProps>;
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
  const dealRef = useRef<IEditDealModalRef>(null);
  const detailRef = useRef<ITransactionRecordDetailModalRef>(null);
  return useLocalObservable(() => new RootStore({ dealRef, detailRef }));
});
