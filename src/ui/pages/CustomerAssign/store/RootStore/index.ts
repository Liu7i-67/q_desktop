import { ITXPeekModalRef } from "@/components/TXPeekModal/interface";
import { ITransferCustomerModalRef } from "@/pages/customerManage/MyCustomerV2/modules/TransferCustomerModal/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IAddCustomerModalRef } from "../../modules/AddCustomerModal/interface";
import { IAssignModalRef } from "../../modules/AssignModal/interface";
import { ICustPeekModalRef } from "../../modules/CustPeekModal/interface";
import { IEditCustomerModalRef } from "../../modules/EditCustomerModal/interface";
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
  const form = Form.useForm()[0];
  const addCustomerForm = Form.useForm()[0];
  const addCustomerModalRef = useRef<IAddCustomerModalRef>(null);
  const assignModalRef = useRef<IAssignModalRef>(null);
  const custPeekModalRef = useRef<ICustPeekModalRef>(null);
  const TXPeekModal = useRef<ITXPeekModalRef>(null);
  const transferRef = useRef<ITransferCustomerModalRef>(null);
  const editCustomerModalRef = useRef<IEditCustomerModalRef>(null);

  return useLocalObservable(
    () =>
      new RootStore({
        form,
        assignModalRef,
        addCustomerModalRef,
        addCustomerForm,
        custPeekModalRef,
        TXPeekModal,
        transferRef,
        editCustomerModalRef,
      })
  );
});
