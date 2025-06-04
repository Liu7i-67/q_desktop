import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { IVisitRecordProps } from "../../interface";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { useRef } from "react";
import { IEditVisitRecordModalRef } from "@/pages/CustomerDrawer/EditVisitRecordModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IVisitRecordProps>;
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
  const editRef = useRef<IEditVisitRecordModalRef>(null);
  return useLocalObservable(() => new RootStore({ editRef }));
});
