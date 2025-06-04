import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { ITransactionManageV2Props } from "../../interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITransactionManageV2Props>;
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
  const form = Form.useForm()[0];
  const transactionRecordDetailModalRef =
    useRef<ITransactionRecordDetailModalRef>(null);
  const transactionEditRecordDetailModalRef =
    useRef<ITransactionRecordDetailModalRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        form,
        transactionRecordDetailModalRef,
        transactionEditRecordDetailModalRef,
      })
  );
});
