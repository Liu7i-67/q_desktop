import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { IHospitalMyCustomerProps } from "../../interface";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { useRef } from "react";
import { IEditOrderStatusModalRef } from "@/pages/CustomerDrawer/EditOrderStatusModal/interface";
import { IInstitutionalFeedbackDrawerRef } from "@/pages/CustomerDrawer/InstitutionalFeedbackDrawer/interface";
import { IOrderDispatchMessageDrawerRef } from "@/pages/CustomerDrawer/OrderDispatchMessageModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IHospitalMyCustomerProps>;
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
  const dispatchRef = useRef<IEditOrderStatusModalRef>(null);
  const feedbackRef = useRef<IInstitutionalFeedbackDrawerRef>(null);
  const msgRef = useRef<IOrderDispatchMessageDrawerRef>(null);
  return useLocalObservable(
    () => new RootStore({ dispatchRef, feedbackRef, msgRef })
  );
});
