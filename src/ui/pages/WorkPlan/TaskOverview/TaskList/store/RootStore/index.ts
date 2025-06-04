import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { ITaskListProps } from "../../interface";
import { IRootStore, TLoadingStore, IRefs, ISearchInfo } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { Form } from "antd";
import { useRef } from "react";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITaskListProps>;
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
  const [form] = Form.useForm<ISearchInfo>();
  const customerRef = useRef<ICustomerDrawerRef>(null);
  return useLocalObservable(() => new RootStore({ form, customerRef }));
});
