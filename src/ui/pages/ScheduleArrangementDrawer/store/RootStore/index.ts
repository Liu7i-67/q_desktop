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
import { IScheduleArrangementDrawerProps } from "../../interface";
import { useRef } from "react";
import { IUserPickerDrawerRef } from "../../UserPickerDrawer/interface";
import { ISchedulePickerDrawerRef } from "../../SchedulePickerDrawer/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IScheduleArrangementDrawerProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IScheduleArrangementDrawerProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const userRef = useRef<IUserPickerDrawerRef>(null);
  const scheduleRef = useRef<ISchedulePickerDrawerRef>(null);
  return useLocalObservable(() => new RootStore({ userRef, scheduleRef }));
});
