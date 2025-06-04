import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { useRef } from "react";
import { IDepartmentV2Props } from "../../interface";
import { IAddOrEditTypeModalRef } from "../../modules/AddOrEditTypeModal/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IDepartmentV2Props>;
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
  const addorEditModalRef = useRef<IAddOrEditTypeModalRef>(null);
  const txTreeSidebarRef = useRef<IITXTreeSidebarRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        addorEditModalRef,
        txTreeSidebarRef,
      })
  );
});
