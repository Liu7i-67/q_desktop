import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs, ISearchInfo } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITransactionRecordDetailModalProps } from "../../interface";
import { useRef } from "react";
import { Form } from "antd";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<ITransactionRecordDetailModalProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<ITransactionRecordDetailModalProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const [form] = Form.useForm<ISearchInfo>();
  return useLocalObservable(() => new RootStore({ form }));
});
