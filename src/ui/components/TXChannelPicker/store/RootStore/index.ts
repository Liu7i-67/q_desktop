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
import { ITXChannelPickerProps } from "../../interface";
import { useRef } from "react";
import { ITXEmployeePickerModalRef } from "@/components/TXEmployeePicker/Modal";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITXChannelPickerProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<ITXChannelPickerProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const userRef = useRef<ITXEmployeePickerModalRef>(null);
  return useLocalObservable(() => new RootStore({ userRef }));
});
