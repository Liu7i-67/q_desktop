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
import { IOrderDispatchRecordProps } from "../../interface";
import { useRef } from "react";
import { IHistoricalDispatchingModalRef } from "@/pages/HistoricalDispatchingModal/interface";
import { IEditDispatchRecordModalRef } from "@/pages/CustomerDrawer/EditDispatchRecordModal/interface";
import { IOrderDispatchMessageModalRef } from "@/pages/CustomerDrawer/OrderDispatchMessageModal/interface";
import { IEditOrderStatusModalRef } from "@/pages/CustomerDrawer/EditOrderStatusModal/interface";
import { IInstitutionalFeedbackDrawerRef } from "@/pages/CustomerDrawer/InstitutionalFeedbackDrawer/interface";
import { IEditDealModalRef } from "@/pages/CustomerDrawer/EditDealModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IOrderDispatchRecordProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IOrderDispatchRecordProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const historyRecordRef = useRef<IHistoricalDispatchingModalRef>(null);
  const editRef = useRef<IEditDispatchRecordModalRef>(null);
  const msgRef = useRef<IOrderDispatchMessageModalRef>(null);
  const statusRef = useRef<IEditOrderStatusModalRef>(null);
  const feedbackRef = useRef<IInstitutionalFeedbackDrawerRef>(null);
  const dealRef = useRef<IEditDealModalRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        historyRecordRef,
        editRef,
        msgRef,
        statusRef,
        feedbackRef,
        dealRef,
      })
  );
});
