import { ITXPeekModalRef } from "@/components/TXPeekModal/interface";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { IEditDispatchRecordModalRef } from "@/pages/CustomerDrawer/EditDispatchRecordModal/interface";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { IMergeCustomerModalRef } from "../../modules/MergeCustomerModal/interface";
import { IRepeatModalRef } from "../../modules/RepeatModal/interface";
import { ITransferCustomerModalRef } from "../../modules/TransferCustomerModal/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

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
  const [searchForm] = Form.useForm();
  const repeatRef = useRef<IRepeatModalRef>(null);
  const editRef = useRef<IEditModalRef>(null);
  const customerDrawerRef = useRef<ICustomerDrawerRef>(null);
  const editDispatchRecordRef = useRef<IEditDispatchRecordModalRef>(null);
  const mergeCustomerModalRef = useRef<IMergeCustomerModalRef>(null);
  const transferRef = useRef<ITransferCustomerModalRef>(null);
  const collRef = useRef<ICollaborationModalRef>(null);
  const TXPeekModalRef = useRef<ITXPeekModalRef>(null);

  return useLocalObservable(
    () =>
      new RootStore({
        searchForm,
        repeatRef,
        transferRef,
        editRef,
        customerDrawerRef,
        editDispatchRecordRef,
        mergeCustomerModalRef,
        collRef,
        TXPeekModalRef,
      })
  );
});
