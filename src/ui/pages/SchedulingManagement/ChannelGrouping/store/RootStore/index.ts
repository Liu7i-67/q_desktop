import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { useRef } from "react";
import { IEditChannelGroupingModalRef } from "@/pages/SchedulingManagement/EditChannelGroupingModal";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const editRef = useRef<IEditChannelGroupingModalRef>(null);
  return useLocalObservable(() => new RootStore({ editRef }));
});
